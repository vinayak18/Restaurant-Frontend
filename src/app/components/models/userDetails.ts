
import { blobImage } from "./blobImage";
import { product } from "./product";

export class userDetails {
  userId: string;
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  img_url: string;
  blobImage: blobImage;
  cart: product[];
  constructor(
    $userId: string,
    $name: string,
    $email: string,
    $phoneNo: string,
    $password: string,
    $img_url: string,
    $blobImage: blobImage,
    $cart: product[]
  ) {
    this.userId = $userId;
    this.name = $name;
    this.email = $email;
    this.phoneNo = $phoneNo;
    this.password = $password;
    this.img_url = $img_url;
    this.blobImage = $blobImage; 
    this.cart = $cart;
  }
}
