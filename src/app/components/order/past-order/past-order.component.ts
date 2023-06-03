import { Component } from '@angular/core';
import { foodType } from '../../models/foodType';
import { order } from '../../models/order';
import { status } from '../../models/status';

@Component({
  selector: 'app-past-order',
  templateUrl: './past-order.component.html',
  styleUrls: ['./past-order.component.css'],
})
export class PastOrderComponent {
  pageNo_ongoing: number = 1;
  pageNo_past: number = 1;
  orderPerPage: number = 4;
  rating: number[] = [1, 2, 3, 4, 5];
  orders: order[] = [
    {
      orderId: '#12342',
      userId: '#1',
      dateOfOrder: 'Timestamp',
      orderDetails: [
        {
          pid: 1,
          name: 'Boba Tea',
          desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
          price: 200,
          quantity: 1,
          avgRating: 4.5,
          img_url: [
            '../../assets/img/breakfast-1.jpg',
            '../../assets/img/hero-1.jpg',
            '../../assets/img/hero-2.jpg',
            '../../assets/img/hero-3.jpg',
          ],
          type: foodType.SPECIAL_DISH,
          category: 'VEG',
          live: true,
        },
      ],
      actualAmount: 1.0,
      tax: 18,
      deliveryFee: 25,
      coupon: {
        couponCode: 'First100',
        totalAmount: 1000,
        discountAmount: 160,
      },

      netAmount: 1000.0,
      deliveryType: 'Delivery',
      customerInfo: null,
      status: status.ACCEPTED,
      payment: 'UPI',
      rating: 5,
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  ongoingOrdersList: order[] = [
    {
      orderId: '12342',
      userId: '#1',
      dateOfOrder: 'October 16, 2:57 PM',
      orderDetails: [
        {
          pid: 1,
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
          type: foodType.SPECIAL_DISH,
          category: 'VEG',
          live: true,
        },
      ],
      actualAmount: 1.0,
      tax: 18,
      deliveryFee: 25,
      coupon: {
        couponCode: 'First100',
        totalAmount: 1000,
        discountAmount: 160,
      },
      netAmount: 1000.0,
      deliveryType: 'Delivery',
      customerInfo: null,
      status: status.ACCEPTED,
      payment: 'UPI',
      rating: 5,
    },
    {
      orderId: '12341',
      userId: '#1',
      dateOfOrder: 'October 16, 2:57 PM',
      orderDetails: [
        {
          pid: 1,
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
          type: foodType.SPECIAL_DISH,
          category: 'VEG',
          live: true,
        },
      ],
      actualAmount: 1.0,
      tax: 18,
      deliveryFee: 25,
      coupon: {
        couponCode: 'First100',
        totalAmount: 1000,
        discountAmount: 160,
      },
      netAmount: 1000.0,
      deliveryType: 'Delivery',
      customerInfo: null,
      status: status.ACCEPTED,
      payment: 'UPI',
      rating: 5,
    },
    {
      orderId: '12343',
      userId: '#1',
      dateOfOrder: 'October 16, 2:57 PM',
      orderDetails: [
        {
          pid: 1,
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
          type: foodType.SPECIAL_DISH,
          category: 'VEG',
          live: true,
        },
      ],
      actualAmount: 1.0,
      tax: 18,
      deliveryFee: 25,
      coupon: {
        couponCode: 'First100',
        totalAmount: 1000,
        discountAmount: 160,
      },
      netAmount: 1000.0,
      deliveryType: 'Delivery',
      customerInfo: null,
      status: status.ACCEPTED,
      payment: 'UPI',
      rating: 5,
    },
    {
      orderId: '12344',
      userId: '#1',
      dateOfOrder: 'October 16, 2:57 PM',
      orderDetails: [
        {
          pid: 1,
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
          type: foodType.SPECIAL_DISH,
          category: 'VEG',
          live: true,
        },
      ],
      actualAmount: 1.0,
      tax: 18,
      deliveryFee: 25,
      coupon: {
        couponCode: 'First100',
        totalAmount: 1000,
        discountAmount: 160,
      },
      netAmount: 1000.0,
      deliveryType: 'Delivery',
      customerInfo: null,
      status: status.ACCEPTED,
      payment: 'UPI',
      rating: 5,
    },
    {
      orderId: '12345',
      userId: '#1',
      dateOfOrder: 'October 16, 2:57 PM',
      orderDetails: [
        {
          pid: 1,
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
          type: foodType.SPECIAL_DISH,
          category: 'VEG',
          live: true,
        },
      ],
      actualAmount: 1.0,
      tax: 18,
      deliveryFee: 25,
      coupon: {
        couponCode: 'First100',
        totalAmount: 1000,
        discountAmount: 160,
      },
      netAmount: 1000.0,
      deliveryType: 'Delivery',
      customerInfo: null,
      status: status.ACCEPTED,
      payment: 'UPI',
      rating: 5,
    },
  ];
  pastOrdersList: order[] = [
    {
      orderId: '12340',
      userId: '#1',
      dateOfOrder: 'October 16, 2:57 PM',
      orderDetails: [
        {
          pid: 1,
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
          type: foodType.SPECIAL_DISH,
          category: 'VEG',
          live: true,
        },
      ],
      actualAmount: 1.0,
      tax: 18,
      deliveryFee: 25,
      coupon: {
        couponCode: 'First100',
        totalAmount: 1000,
        discountAmount: 160,
      },
      netAmount: 1000.0,
      deliveryType: 'Delivery',
      customerInfo: null,
      status: status.ACCEPTED,
      payment: 'UPI',
      rating: 5,
    },
    {
      orderId: '12339',
      userId: '#1',
      dateOfOrder: 'October 16, 2:57 PM',
      orderDetails: [
        {
          pid: 1,
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
          type: foodType.SPECIAL_DISH,
          category: 'VEG',
          live: true,
        },
      ],
      actualAmount: 1.0,
      tax: 18,
      deliveryFee: 25,
      coupon: {
        couponCode: 'First100',
        totalAmount: 1000,
        discountAmount: 160,
      },
      netAmount: 1000.0,
      deliveryType: 'Delivery',
      customerInfo: null,
      status: status.ACCEPTED,
      payment: 'UPI',
      rating: 5,
    },
    {
      orderId: '12338',
      userId: '#1',
      dateOfOrder: 'October 16, 2:57 PM',
      orderDetails: [
        {
          pid: 1,
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
          type: foodType.SPECIAL_DISH,
          category: 'VEG',
          live: true,
        },
      ],
      actualAmount: 1.0,
      tax: 18,
      deliveryFee: 25,
      coupon: {
        couponCode: 'First100',
        totalAmount: 1000,
        discountAmount: 160,
      },
      netAmount: 1000.0,
      deliveryType: 'Delivery',
      customerInfo: null,
      status: status.ACCEPTED,
      payment: 'UPI',
      rating: 5,
    },
    {
      orderId: '12337',
      userId: '#1',
      dateOfOrder: 'October 16, 2:57 PM',
      orderDetails: [
        {
          pid: 1,
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
          type: foodType.SPECIAL_DISH,
          category: 'VEG',
          live: true,
        },
      ],
      actualAmount: 1.0,
      tax: 18,
      deliveryFee: 25,
      coupon: {
        couponCode: 'First100',
        totalAmount: 1000,
        discountAmount: 160,
      },
      netAmount: 1000.0,
      deliveryType: 'Delivery',
      customerInfo: null,
      status: status.ACCEPTED,
      payment: 'UPI',
      rating: 5,
    },
    {
      orderId: '12336',
      userId: '#1',
      dateOfOrder: 'Timestamp',
      orderDetails: [
        {
          pid: 1,
          name: 'Boba Tea',
          desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
          price: 200,
          quantity: 1,
          avgRating: 4.5,
          img_url: [
            '../../assets/img/breakfast-1.jpg',
            '../../assets/img/hero-1.jpg',
            '../../assets/img/hero-2.jpg',
            '../../assets/img/hero-3.jpg',
          ],
          type: foodType.SPECIAL_DISH,
          category: 'VEG',
          live: true,
        },
      ],
      actualAmount: 1.0,
      tax: 18,
      deliveryFee: 25,
      coupon: {
        couponCode: 'First100',
        totalAmount: 1000,
        discountAmount: 160,
      },
      netAmount: 1000.0,
      deliveryType: 'Delivery',
      customerInfo: null,
      status: status.DELIVERED,
      payment: 'UPI',
      rating: 5,
    },
  ];
  setRating(rate: number) {
    console.log(rate);
  }
}
