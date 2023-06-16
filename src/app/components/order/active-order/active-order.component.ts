import { Component } from '@angular/core';
import { foodType } from '../../models/foodType';
import { order } from '../../models/order';
import { status } from '../../models/status';
import { OrderService } from 'src/app/services/user-coupon-order/order.service';
import { UserService } from 'src/app/services/user-coupon-order/user.service';

@Component({
  selector: 'app-active-order',
  templateUrl: './active-order.component.html',
  styleUrls: ['./active-order.component.css'],
})
export class ActiveOrderComponent {
  pageNo_ongoing: number = 1;
  pageNo_past: number = 1;
  orderPerPage: number = 4;
  rating: number[] = [1, 2, 3, 4, 5];
  activeOrdersList: order[] = [];
  orderRating = null;
  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const currUser = this.userService.getCurrentUserDetails();
    this.orderService.getActiveOrders(currUser.userId).subscribe((data) => {
      this.activeOrdersList = data;
      this.orderRating = new Array(this.activeOrdersList.length);
      for (let index = 0; index < this.activeOrdersList.length; index++) {
        this.orderRating[index] = this.activeOrdersList[index].rating;
      }
      // this.orderRating.fill(0);
    });
  }

  setRating(orderId: string, rate: number) {
    console.log(rate);
    console.log(orderId);
    this.orderService.updateOrderRating(orderId, rate).subscribe((data) => {
      this.ngOnInit();
      // this.orderRating.fill(0);
    });
  }
}
