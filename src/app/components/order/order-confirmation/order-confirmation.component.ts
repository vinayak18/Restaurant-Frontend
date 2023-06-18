import { Component, OnInit } from '@angular/core';
import { EncryptDecryptService } from 'src/app/services/common/encrypt-decrypt.service';
import { OrderService } from 'src/app/services/user-coupon-order/order.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css'],
})
export class OrderConfirmationComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(
    private decrpy: EncryptDecryptService,
    private orderService: OrderService
  ) {}
}
