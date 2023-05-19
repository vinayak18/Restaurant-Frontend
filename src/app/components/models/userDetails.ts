export class userDetails {
  name: string;
  email: string;
  phoneNo: string;
  password: string;

  constructor(
    $name: string,
    $email: string,
    $phoneNo: string,
    $password: string
  ) {
    this.name = $name;
    this.email = $email;
    this.phoneNo = $phoneNo;
    this.password = $password;
  }
}
