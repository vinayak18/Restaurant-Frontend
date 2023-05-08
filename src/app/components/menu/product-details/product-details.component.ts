import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { foodType } from 'src/app/components/models/foodType';
import { product } from 'src/app/components/models/product';
import { review } from 'src/app/components/models/review';
import { userReview } from 'src/app/components/models/userReview';
import { ProductReviewService } from 'src/app/services/product-review/product-review.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  pageNo: number = 1;
  reviewPerPage: number = 2;
  productId: number;
  selectedImage: string = '';
  reviewFlag: boolean;
  reviewForm: userReview;
  bestseller: product[] = [
    {
      pid: 21,
      name: 'Pizza',
      desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
      price: 250,
      quantity: 1,
      avgRating: 4.5,
      img_url: [
        '../../assets/img/hero-3.jpg',
        '../../assets/img/hero-1.jpg',
        '../../assets/img/hero-2.jpg',
        '../../assets/img/breakfast-1.jpg',
      ],
      type: foodType.LUNCH,
      category: 'VEG',
      live: true,
    },
    {
      pid: 22,
      name: 'Sahi Paneer',
      desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
      price: 200,
      quantity: 1,
      avgRating: 4.5,
      img_url: [
        '../../assets/img/hero-3.jpg',
        '../../assets/img/hero-1.jpg',
        '../../assets/img/hero-2.jpg',
        '../../assets/img/breakfast-1.jpg',
      ],
      type: foodType.LUNCH,
      category: 'VEG',
      live: true,
    },
    {
      pid: 23,
      name: 'Aloo Dum',
      desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
      price: 200,
      quantity: 1,
      avgRating: 4.5,
      img_url: [
        '../../assets/img/hero-3.jpg',
        '../../assets/img/hero-1.jpg',
        '../../assets/img/hero-2.jpg',
        '../../assets/img/breakfast-1.jpg',
      ],
      type: foodType.LUNCH,
      category: 'VEG',
      live: true,
    },
  ];
  product: product = {
    pid: 1,
    name: 'Boba Tea',
    desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
    price: 200,
    quantity: 1,
    avgRating: 4.5,
    img_url: [
      '../../assets/img/hero-3.jpg',
      '../../assets/img/hero-1.jpg',
      '../../assets/img/hero-2.jpg',
      '../../assets/img/breakfast-1.jpg',
    ],
    type: foodType.LUNCH,
    category: 'VEG',
    live: true,
  };
  productReview: review = {
    reviewId: 1,
    pid: 1,
    totalRating: 9,
    noOfRating: 2,
    userReview: [
      {
        userId: 'vin123',
        name: 'Vinayak Saraf',
        img_url: '../../assets/img/chef-1.jpg',
        userRating: 4,
        dateOfReview: '3-21-2023',
        review: 'Great food!',
      },
      {
        userId: 'smn345',
        name: 'Sumon Dey',
        img_url: '../../assets/img/chef-2.jpg',
        userRating: 5,
        dateOfReview: '3-21-2023',
        review: 'Supperrr!',
      },
      {
        userId: 'bjt45',
        name: 'Daniel Park',
        img_url: '../../assets/img/chef-3.jpg',
        userRating: 4.5,
        dateOfReview: '3-21-2023',
        review: 'Great Experience!',
      },
    ],
  };
  constructor(
    private activeRoute: ActivatedRoute,
    private product_review_service: ProductReviewService
  ) {
    this.productId = this.activeRoute.snapshot.params['productId'];
    console.log(this.productId);
  }
  ngOnInit(): void {
    this.getProductById();
  }
  getProductById() {
    this.product_review_service
      .getProductById(this.productId)
      .subscribe((data) => {
        this.product = data;
        this.selectedImage = this.product.img_url[0];
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
    this.reviewForm = new userReview('SMN1', 'Sumon Dey', '', 0, '', '');
  }
  addReview() {
    alert(this.reviewForm.userRating);
    this.reviewFlag = false;
  }
}
