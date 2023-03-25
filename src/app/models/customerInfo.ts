import { address } from './address';

export class customerInfo {
  name: string;
  email: string;
  phoneNo: number;
  deliveryAddress: address;
  constructor(
    $name: string,
    $email: string,
    $phoneNo: number,
    $deliveryAddress: address
  ) {
    this.name = $name;
    this.email = $email;
    this.phoneNo = $phoneNo;
    this.deliveryAddress = $deliveryAddress;
  }
}
