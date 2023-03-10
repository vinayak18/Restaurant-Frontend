import { foodType } from './foodType';

export class product {
  pId: number;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  img_url: string;
  type: foodType;
  catagory: string;
  live: boolean;
  constructor(
    $pId: number,
    $name: string,
    $desc: string,
    $price: number,
    $quantity: number,
    $img_url: string,
    $type: foodType,
    $catagory: string,
    $live: boolean
  ) {
    this.pId = $pId;
    this.name = $name;
    this.desc = $desc;
    this.price = $price;
    this.quantity = $quantity;
    this.img_url = $img_url;
    this.type = $type;
    this.catagory = $catagory;
    this.live = $live;
  }
}
