import { coupon } from './coupon';
import { customerInfo } from './customerInfo';
import { product } from './product';
import { status } from './status';

export class order {
  orderId: string;
  userId: string;
  dateOfOrder: string;
  orderDetails: product[];
  actualAmount: number;
  tax: number;
  deliveryFee: number;
  coupon: coupon;
  netAmount: number;
  deliveryType: string;
  customerInfo: customerInfo;
  status: status;
  payment: string;
  rating: number;
  constructor(
    $orderId: string,
    $userId: string,
    $dateOfOrder: string,
    $orderDetails: product[],
    $actualAmount: number,
    $tax: number,
    $deliveryFee: number,
    $coupon: coupon,
    $netAmount: number,
    $deliveryType: string,
    $customerInfo: customerInfo,
    $status: status,
    $payment: string,
    $rating: number
  ) {
    this.orderId = $orderId;
    this.userId = $userId;
    this.dateOfOrder = $dateOfOrder;
    this.orderDetails = $orderDetails;
    this.actualAmount = $actualAmount;
    this.tax = $tax;
    this.deliveryFee = $deliveryFee;
    this.coupon = $coupon;
    this.netAmount = $netAmount;
    this.deliveryType = $deliveryType;
    this.customerInfo = $customerInfo;
    this.status = $status;
    this.payment = $payment;
    this.rating = $rating;
  }
}
