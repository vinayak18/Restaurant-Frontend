import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { foodType } from 'src/app/models/foodType';
import { product } from 'src/app/models/product';
import { review } from 'src/app/models/review';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: number;
  selectedImage: string = '';
  bestseller: product[] = [
    {
      pId: 21,
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
      catagory: 'VEG',
      live: true,
    },
    {
      pId: 22,
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
      catagory: 'VEG',
      live: true,
    },
    {
      pId: 23,
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
      catagory: 'VEG',
      live: true,
    },
  ];
  product: product = {
    pId: 1,
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
    catagory: 'VEG',
    live: true,
  };
  productReview: review = {
    reviewId: 1,
    pId: 1,
    totalRating: 9,
    noOfRating: 2,
    userReview: [
      {
        userId: "vin123",
        name: 'Vinayak Saraf',
        img_url: '../../assets/img/chef-1',
        userRating: 4,
        dateOfReview: '3-21-2023',
        review: 'Great food!'
      },
      {
        userId: "smn345",
        name: 'Sumon Dey',
        img_url: '../../assets/img/chef-2',
        userRating: 5,
        dateOfReview: '3-21-2023',
        review: 'Supperrr!'
      }
    ]
  }
  constructor(private activeRoute: ActivatedRoute) {
    this.productId = this.activeRoute.snapshot.params['productId'];
    console.log(this.productId);
  }
  ngOnInit(): void {
    this.selectedImage = this.product.img_url[0];
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
}
