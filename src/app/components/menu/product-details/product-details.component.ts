import { ReviewService } from './../../../services/product-review/review.service';
import { UserService } from 'src/app/services/user-coupon-order/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { foodType } from 'src/app/components/models/foodType';
import { product } from 'src/app/components/models/product';
import { review } from 'src/app/components/models/review';
import { userReview } from 'src/app/components/models/userReview';
import { ProductService } from 'src/app/services/product-review/product.service';
import { secretKey } from '../../models/secretKey';
import { EncryptDecryptService } from 'src/app/services/common/encrypt-decrypt.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { userDetails } from '../../models/userDetails';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  pageNo: number = 1;
  reviewPerPage: number = 3;
  productId: number;
  selectedImage: string = '';
  reviewFlag: boolean;
  reviewForm: userReview;
  isLoggedIn: boolean = false;
  currUser: userDetails = {} as userDetails;
  bestseller: product[] = [];
  product: product = {} as product;
  productReview: review = {
    totalRating: 0,
    noOfRating: 0,
    userReview: []
  } as review;
  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private userService: UserService,
    private encrypt_decrypt: EncryptDecryptService
  ) {
    this.productId = this.activeRoute.snapshot.params['productId'];
    console.log(this.productId);
  }
  ngOnInit(): void {
    this.currUser = this.userService.getCurrentUserDetails();
    this.authService.isLoggedIn.subscribe((data) => {
      this.isLoggedIn = data;
    });
    this.getProductById();
    this.getBestSellers();
    this.getReviewByPID();
  }
  getProductById() {
    this.productService.getProductById(this.productId).subscribe((data) => {
      this.product = data;
      this.selectedImage = this.product.img_url[0];
    });
  }
  getBestSellers() {
    this.productService.getBestSellers(this.productId).subscribe((data) => {
      this.bestseller = data;
    });
  }
  getReviewByPID() {
    this.reviewService.getReviewByPID(this.productId).subscribe((data) => {
      this.productReview = data;
    });
  }
  changeSelectedImage(url: string) {
    this.selectedImage = url;
  }
  handleMinus() {
    this.product.quantity--;
  }
  handlePlus() {
    this.product.quantity++;
  }
  reviewSection() {
    this.reviewFlag = !this.reviewFlag;
    this.reviewForm = new userReview(
      this.currUser.userId,
      this.currUser.name,
      this.currUser.img_url,
      0,
      '',
      ''
    );
  }
  addReview() {
    if (this.reviewForm.userRating != 0 && this.reviewForm.review != '') {
      this.reviewService.addNewReviewByPID(this.productId,this.reviewForm).subscribe((data) => {
        console.log('Please add snackbar to display - review successfully added');
        this.reviewFlag = false;
        this.getReviewByPID();
      });
    }else{
      console.log('Please add snackbar to display error to add msg and rating before proceeding');
    }
  }

  addToCart() {
    let cart: product[] = [];
    let data = sessionStorage.getItem(
      this.encrypt_decrypt.encryption('Cart', secretKey)
    );
    if (data !== null && data !== undefined) {
      cart = JSON.parse(this.encrypt_decrypt.decryption(data, secretKey));
    }
    for (let x of cart) {
      if (this.product.pid === x.pid) {
        console.log('Product already exists!');
        return;
      }
    }
    cart.push(this.product);
    sessionStorage.setItem(
      this.encrypt_decrypt.encryption('Cart', secretKey),
      this.encrypt_decrypt.encryption(JSON.stringify(cart), secretKey)
    );
    if (this.isLoggedIn) {
      const currUser = this.userService.getCurrentUserDetails();
      this.userService
        .addToCartProducts(currUser.userId, cart)
        .subscribe((data) => {
          this.userService.setUserDetails(data.body);
        });
    }
  }
}
