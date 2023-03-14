import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { foodType } from '../models/foodType';
import { product } from '../models/product';

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
      transition(':leave', [
        animate('400ms ease', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class MenuComponent implements OnInit {
  breakfastList: product[] = [];
  lunchList: product[] = [];
  dinnerList: product[] = [];
  value = 0;
  orderDetails: product[] =  [
    {
      pId: 1,
      name: 'Boba Tea',
      desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
      price: 200,
      quantity: 1,
      img_url: '../../assets/img/breakfast-1.jpg',
      type: foodType.LUNCH,
      catagory: 'VEG',
      live: true,
    },
    {
      pId: 1,
      name: 'Pizza',
      desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
      price: 200,
      quantity: 1,
      img_url: '../../assets/img/breakfast-1.jpg',
      type: foodType.DINNER,
      catagory: 'VEG',
      live: true,
    },
    {
      pId: 1,
      name: 'Pizza',
      desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
      price: 200,
      quantity: 1,
      img_url: '../../assets/img/breakfast-1.jpg',
      type: foodType.LUNCH,
      catagory: 'VEG',
      live: true,
    },
    {
      pId: 1,
      name: 'Boba Tea',
      desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
      price: 200,
      quantity: 1,
      img_url: '../../assets/img/breakfast-1.jpg',
      type: foodType.BREAKFAST,
      catagory: 'VEG',
      live: true,
    },
  ];
  showOrHideFlag: boolean[] = [true,true,true];
  constructor() {}

  ngOnInit(): void {
    this.breakfastList = this.orderDetails.filter((value)=> value.type === foodType.BREAKFAST);
    this.lunchList = this.orderDetails.filter((value)=> value.type === foodType.LUNCH);
    this.dinnerList = this.orderDetails.filter((value)=> value.type === foodType.DINNER);
  }
  handleMinus(item) {
    item.quantity--;
  }
  handlePlus(item) {
    item.quantity++;
  }
  toggleFlag(index: number){
    this.showOrHideFlag[index] = !this.showOrHideFlag[index];
  }
}
