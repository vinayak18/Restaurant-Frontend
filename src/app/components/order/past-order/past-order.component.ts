import { Component } from '@angular/core';
import { foodType } from '../../models/foodType';
import { order } from '../../models/order';
import { status } from '../../models/status';
import { OrderService } from 'src/app/services/user-coupon-order/order.service';
import { UserService } from 'src/app/services/user-coupon-order/user.service';

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
  pastOrdersList: order[] = [];
  orderRating = null;
  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const currUser = this.userService.getCurrentUserDetails();
    this.orderService.getPastOrders(currUser.userId).subscribe((data) => {
      this.pastOrdersList = data;
      this.orderRating = new Array(this.pastOrdersList.length);
      for (let index = 0; index < this.pastOrdersList.length; index++) {
        this.orderRating[index] = this.pastOrdersList[index].rating;
      }
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
