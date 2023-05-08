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
import { ProductReviewService } from 'src/app/services/product-review/product-review.service';

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
  allProducts: product[] = [];
  showOrHideFlag: boolean[] = [true, true, true];
  constructor(private product_review_service: ProductReviewService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.product_review_service.getAllProducts().subscribe((data) => {
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
}
