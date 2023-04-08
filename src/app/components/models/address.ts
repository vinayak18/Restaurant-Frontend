export class address {
  streetAddress: string;
  flatNo: string;
  landmark: string;
  pincode: number;
  state: string;
  city: string;

  constructor(
    $streetAddress: string,
    $flatNo: string,
    $landmark: string,
    $pincode: number,
    $state: string,
    $city: string
  ) {
    this.streetAddress = $streetAddress;
    this.flatNo = $flatNo;
    this.landmark = $landmark;
    this.pincode = $pincode;
    this.state = $state;
    this.city = $city;
  }
}
