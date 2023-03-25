import { customerInfo } from './customerInfo';
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
    $taxRate: number,
    $deliveryFee: number,
    $couponCode: string,
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
    this.taxRate = $taxRate;
    this.deliveryFee = $deliveryFee;
    this.couponCode = $couponCode;
    this.netAmount = $netAmount;
    this.deliveryType = $deliveryType;
    this.customerInfo = $customerInfo;
    this.status = $status;
    this.payment = $payment;
    this.rating = $rating;
  }
}
