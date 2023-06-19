import { product } from "./product";

export class userDetails {
  userId: string;
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  img_url: string;
  cart: product[];
  constructor(
    $userId: string,
    $name: string,
    $email: string,
    $phoneNo: string,
    $password: string,
    $img_url: string,
    $cart: product[]
  ) {
    this.userId = $userId;
    this.name = $name;
    this.email = $email;
    this.phoneNo = $phoneNo;
    this.password = $password;
    this.img_url = $img_url;
    this.cart = $cart;
  }
}
