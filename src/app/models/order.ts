import { product } from './product';
import { status } from './status';

export class order {
  orderId: string;
  userId: string;
  dateOfOrder: string;
  orderDetails: product[];
  actualAmount: number;
  taxRate: number;
  deliveryFee: number;
  couponCode: string;
  netAmount: number;
  status: status;
  payment: string;
  rating: number;
  constructor(
    $orderId: string,
    $userId: string,
    $dateOfOrder: string,
    $orderDetails: product[],
    $actualAmount: number,
    $taxRate: number,
    $deliveryFee: number,
    $couponCode: string,
    $netAmount: number,
    $status: status,
    $payment: string,
    $rating: number
  ) {
    this.orderId = $orderId;
    this.userId = $userId;
    this.dateOfOrder = $dateOfOrder;
    this.orderDetails = $orderDetails;
    this.actualAmount = $actualAmount;
    this.taxRate = $taxRate;
    this.deliveryFee = $deliveryFee;
    this.couponCode = $couponCode;
    this.netAmount = $netAmount;
    this.status = $status;
    this.payment = $payment;
    this.rating = $rating;
  }
}
