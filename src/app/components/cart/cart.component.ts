import { Component, OnInit } from '@angular/core';
import { foodType } from '../models/foodType';
import { product } from '../models/product';
import { EncryptDecryptService } from 'src/app/services/common/encrypt-decrypt.service';
import { secretKey } from '../models/secretKey';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user-coupon-order/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  totalAmount: number = 0;
  cartItems: product[] = [];
  isLoggedIn: boolean = false;
  isSaved: boolean = false;
  // cartItems: product[] = [
  //   {
  //     pid: 21,
  //     name: 'Pizza',
  //     desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
  //     price: 250,
  //     quantity: 1,
  //     avgRating: 4.5,
  //     img_url: [
  //       '../../assets/img/hero-3.jpg',
  //       '../../assets/img/hero-1.jpg',
  //       '../../assets/img/hero-2.jpg',
  //       '../../assets/img/breakfast-1.jpg',
  //     ],
  //     type: foodType.LUNCH,
  //     category: 'VEG',
  //     live: true,
  //   },
  //   {
  //     pid: 22,
  //     name: 'Sahi Paneer',
  //     desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
  //     price: 200,
  //     quantity: 1,
  //     avgRating: 4.5,
  //     img_url: [
  //       '../../assets/img/hero-2.jpg',
  //       '../../assets/img/hero-1.jpg',
  //       '../../assets/img/hero-3.jpg',
  //       '../../assets/img/breakfast-1.jpg',
  //     ],
  //     type: foodType.LUNCH,
  //     category: 'VEG',
  //     live: true,
  //   },
  //   {
  //     pid: 11,
  //     name: 'Pizza',
  //     desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
  //     price: 250,
  //     quantity: 1,
  //     avgRating: 4.5,
  //     img_url: [
  //       '../../assets/img/hero-3.jpg',
  //       '../../assets/img/hero-1.jpg',
  //       '../../assets/img/hero-2.jpg',
  //       '../../assets/img/breakfast-1.jpg',
  //     ],
  //     type: foodType.LUNCH,
  //     category: 'VEG',
  //     live: true,
  //   },
  //   {
  //     pid: 12,
  //     name: 'Sahi Paneer',
  //     desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
  //     price: 200,
  //     quantity: 1,
  //     avgRating: 4.5,
  //     img_url: [
  //       '../../assets/img/hero-2.jpg',
  //       '../../assets/img/hero-1.jpg',
  //       '../../assets/img/hero-3.jpg',
  //       '../../assets/img/breakfast-1.jpg',
  //     ],
  //     type: foodType.LUNCH,
  //     category: 'VEG',
  //     live: true,
  //   },
  //   {
  //     pid: 1,
  //     name: 'Pizza',
  //     desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
  //     price: 250,
  //     quantity: 1,
  //     avgRating: 4.5,
  //     img_url: [
  //       '../../assets/img/hero-3.jpg',
  //       '../../assets/img/hero-1.jpg',
  //       '../../assets/img/hero-2.jpg',
  //       '../../assets/img/breakfast-1.jpg',
  //     ],
  //     type: foodType.LUNCH,
  //     category: 'VEG',
  //     live: true,
  //   },
  //   {
  //     pid: 2,
  //     name: 'Sahi Paneer',
  //     desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
  //     price: 200,
  //     quantity: 1,
  //     avgRating: 4.5,
  //     img_url: [
  //       '../../assets/img/hero-2.jpg',
  //       '../../assets/img/hero-1.jpg',
  //       '../../assets/img/hero-3.jpg',
  //       '../../assets/img/breakfast-1.jpg',
  //     ],
  //     type: foodType.LUNCH,
  //     category: 'VEG',
  //     live: true,
  //   },
  // ];
  constructor(
    private encrypt_decrypt: EncryptDecryptService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((data) => {
      this.isLoggedIn = data;
    });
    if (this.isLoggedIn) {
      const currUser = this.userService.getCurrentUserDetails();
      this.cartItems = currUser.cart;
    } else {
      let data = sessionStorage.getItem(
        this.encrypt_decrypt.encryption('Cart', secretKey)
      );
      if (data !== null && data !== undefined) {
        this.cartItems = JSON.parse(
          this.encrypt_decrypt.decryption(data, secretKey)
        );
      }
    }
    this.getTotalAmount();
  }

  removeProduct(idx: number, type: string) {
    if (type === 'input') {
      this.isSaved = true;
      if (this.cartItems[idx].quantity === 0) {
        this.cartItems.splice(idx, 1);
        if (this.cartItems.length == 0) {
          this.saveChanges();
        }
      }
    } else {
      this.cartItems.splice(idx, 1);
      this.saveChanges();
    }
    this.getTotalAmount();
  }

  saveChanges() {
    sessionStorage.setItem(
      this.encrypt_decrypt.encryption('Cart', secretKey),
      this.encrypt_decrypt.encryption(JSON.stringify(this.cartItems), secretKey)
    );
    if (this.isLoggedIn) {
      const currUser = this.userService.getCurrentUserDetails();
      this.userService
        .addToCartProducts(currUser.userId, this.cartItems)
        .subscribe((data) => {
          this.userService.setUserDetails(data.body);
        });
    }
    this.isSaved = false;
  }
  getTotalAmount() {
    this.totalAmount = 0;
    for (let product of this.cartItems) {
      this.totalAmount = this.totalAmount + product.price * product.quantity;
    }
  }
}
