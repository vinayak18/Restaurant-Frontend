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

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const currUser = this.userService.getCurrentUserDetails();
    this.orderService.getActiveOrders(currUser.userId).subscribe((data) => {
      this.activeOrdersList = data;
    });
  }

  setRating(rate: number) {
    console.log(rate);
  }
}
