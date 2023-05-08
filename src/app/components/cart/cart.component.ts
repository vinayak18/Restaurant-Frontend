import { Component, OnInit } from '@angular/core';
import { foodType } from '../models/foodType';
import { product } from '../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  totalAmount: number = 0;
  cartItems: product[] = [
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
        '../../assets/img/hero-2.jpg',
        '../../assets/img/hero-1.jpg',
        '../../assets/img/hero-3.jpg',
        '../../assets/img/breakfast-1.jpg',
      ],
      type: foodType.LUNCH,
      category: 'VEG',
      live: true,
    },
    {
      pid: 11,
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
      pid: 12,
      name: 'Sahi Paneer',
      desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
      price: 200,
      quantity: 1,
      avgRating: 4.5,
      img_url: [
        '../../assets/img/hero-2.jpg',
        '../../assets/img/hero-1.jpg',
        '../../assets/img/hero-3.jpg',
        '../../assets/img/breakfast-1.jpg',
      ],
      type: foodType.LUNCH,
      category: 'VEG',
      live: true,
    },
    {
      pid: 1,
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
      pid: 2,
      name: 'Sahi Paneer',
      desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
      price: 200,
      quantity: 1,
      avgRating: 4.5,
      img_url: [
        '../../assets/img/hero-2.jpg',
        '../../assets/img/hero-1.jpg',
        '../../assets/img/hero-3.jpg',
        '../../assets/img/breakfast-1.jpg',
      ],
      type: foodType.LUNCH,
      category: 'VEG',
      live: true,
    },
  ];
  constructor() {}

  ngOnInit(): void {
    this.getTotalAmount();
  }

  removeProduct(idx: number, type: string) {
    if (type === 'input') {
      if (this.cartItems[idx].quantity === 0) {
        this.cartItems.splice(idx, 1);
      }
    } else {
      this.cartItems.splice(idx, 1);
    }
    this.getTotalAmount();
  }
  getTotalAmount() {
    this.totalAmount = 0;
    for (let product of this.cartItems) {
      this.totalAmount = this.totalAmount + product.price * product.quantity;
    }
  }
}
