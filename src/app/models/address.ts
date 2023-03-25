export class address {
  streetAddress: string;
  flatNo: string;
  landMark: string;
  pincode: number;
  state: string;
  city: string;

  constructor(
    $streetAddress: string,
    $flatNo: string,
    $landMark: string,
    $pincode: number,
    $state: string,
    $city: string
  ) {
    this.streetAddress = $streetAddress;
    this.flatNo = $flatNo;
    this.landMark = $landMark;
    this.pincode = $pincode;
    this.state = $state;
    this.city = $city;
  }
}
