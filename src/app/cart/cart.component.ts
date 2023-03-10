import { Component, OnInit } from '@angular/core';
import { product } from '../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: product[] = [];
  constructor() {}

  ngOnInit(): void {}
}
