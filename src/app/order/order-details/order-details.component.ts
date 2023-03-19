import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { foodType } from 'src/app/models/foodType';
import { order } from 'src/app/models/order';
import { product } from 'src/app/models/product';
import { status } from 'src/app/models/status';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderId: string;
  header_flag: number[] = [0, 0, 0, 0];
  breakfastList: product[] = [];
  lunchList: product[] = [];
  dinnerList: product[] = [];
  specialDishList: product[] = [];
  order: order = {
    orderId: '12342',
    userId: '#1',
    dateOfOrder: 'October 16, 2:57 PM',
    orderDetails: [
      {
        pId: 1,
        name: 'Boba Tea',
        desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
        price: 200,
        quantity: 2,
        avgRating: 4.5,
        img_url: [
          '../../assets/img/breakfast-1.jpg',
          '../../assets/img/hero-1.jpg',
          '../../assets/img/hero-2.jpg',
          '../../assets/img/hero-3.jpg',
        ],
        type: foodType.SPEACIAL_DISH,
        catagory: 'VEG',
        live: true,
      },
      {
        pId: 1,
        name: 'Pizza',
        desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
        price: 200,
        quantity: 2,
        avgRating: 4.5,
        img_url: [
          '../../assets/img/breakfast-1.jpg',
          '../../assets/img/hero-1.jpg',
          '../../assets/img/hero-2.jpg',
          '../../assets/img/hero-3.jpg',
        ],
        type: foodType.SPEACIAL_DISH,
        catagory: 'VEG',
        live: true,
      },
      {
        pId: 1,
        name: 'Pizza',
        desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
        price: 200,
        quantity: 2,
        avgRating: 4.5,
        img_url: [
          '../../assets/img/breakfast-1.jpg',
          '../../assets/img/hero-1.jpg',
          '../../assets/img/hero-2.jpg',
          '../../assets/img/hero-3.jpg',
        ],
        type: foodType.LUNCH,
        catagory: 'VEG',
        live: true,
      },
      {
        pId: 1,
        name: 'Boba Tea',
        desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
        price: 200,
        quantity: 2,
        avgRating: 4.5,
        img_url: [
          '../../assets/img/breakfast-1.jpg',
          '../../assets/img/hero-1.jpg',
          '../../assets/img/hero-2.jpg',
          '../../assets/img/hero-3.jpg',
        ],
        type: foodType.BREAKFAST,
        catagory: 'VEG',
        live: true,
      },
    ],
    actualAmount: 1600.0,
    taxRate: 5,
    deliveryFee: 25,
    couponCode: 'FIRST100',
    netAmount: 1537.0,
    status: status.ACCEPTED,
    payment: 'UPI',
    rating: 5,
  };
  discountAmount: number = 160.0;
  constructor(private activeRoute: ActivatedRoute) {
    this.orderId = this.activeRoute.snapshot.params['orderId'];
    console.log(this.orderId);
  }

  ngOnInit(): void {
    this.breakfastList = this.order.orderDetails.filter(
      (value) => value.type === foodType.BREAKFAST
    );
    this.lunchList = this.order.orderDetails.filter(
      (value) => value.type === foodType.LUNCH
    );
    this.dinnerList = this.order.orderDetails.filter(
      (value) => value.type === foodType.DINNER
    );
    this.specialDishList = this.order.orderDetails.filter(
      (value) => value.type === foodType.SPEACIAL_DISH
    );
  }
}
