import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { foodType } from '../models/foodType';
import { product } from '../models/product';
import { ProductService } from 'src/app/services/product-review/product.service';
import { UserService } from 'src/app/services/user-coupon-order/user.service';
import { EncryptDecryptService } from 'src/app/services/common/encrypt-decrypt.service';
import { secretKey } from '../models/secretKey';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SnackbarService } from 'src/app/services/common/snackbar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('400ms ease', style({ opacity: 0 }))]),
    ]),
  ],
})
export class MenuComponent implements OnInit {
  breakfastList: product[] = [];
  lunchList: product[] = [];
  dinnerList: product[] = [];
  value = 0;
  isLoggedIn: boolean = false;
  allProducts: product[] = [];
  showOrHideFlag: boolean[] = [true, true, true];
  constructor(
    private productService: ProductService,
    private snackbarSerivce: SnackbarService,
    private authService: AuthService,
    private userService: UserService,
    private encrypt_decrypt: EncryptDecryptService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((data) => {
      this.isLoggedIn = data;
    });
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.allProducts = data;
      console.log(data);
      this.breakfastList = this.allProducts.filter(
        (value) => value.type === foodType.BREAKFAST
      );
      this.lunchList = this.allProducts.filter(
        (value) => value.type === foodType.LUNCH
      );
      this.dinnerList = this.allProducts.filter(
        (value) => value.type === foodType.DINNER
      );
    });
  }
  handleMinus(item) {
    item.quantity--;
  }
  handlePlus(item) {
    item.quantity++;
  }
  toggleFlag(index: number) {
    this.showOrHideFlag[index] = !this.showOrHideFlag[index];
  }
  addToCart(item: product) {
    // let currentProduct: product = JSON.parse(JSON.stringify(item));
    let cart: product[] = [];
    let data = sessionStorage.getItem(
      this.encrypt_decrypt.encryption('Cart', secretKey)
    );
    if (data !== null && data !== undefined) {
      cart = JSON.parse(this.encrypt_decrypt.decryption(data, secretKey));
    }
    for (let x of cart) {
      if (item.pid === x.pid) {
        this.snackbarSerivce.info('Product already exists in your cart.', '');
        return;
      }
    }
    cart.push(item);
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
