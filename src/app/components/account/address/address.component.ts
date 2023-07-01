import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { address } from 'src/app/models/address';
import { userDetails } from 'src/app/models/userDetails';
import { SnackbarService } from 'src/app/services/common/snackbar.service';
import { UserService } from 'src/app/services/user-coupon-order/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  isEditable: boolean = false;
  addressFormGroup: FormGroup;
  currUser: userDetails;
  presentAddress: address;
  presentIndex: number;
  msg: string;
  constructor(
    private userService: UserService,
    private snackbar: SnackbarService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.presentIndex = -1;
    this.currUser = this.userService.getCurrentUserDetails();
    this.addressFormGroup = this.formBuilder.group({
      streetAddress: ['', Validators.required],
      flatNo: ['', Validators.required],
      landmark: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: [null, Validators.required],
    });
  }
  updateUser() {
    this.userService.updateUser(this.currUser).subscribe(
      (data: userDetails) => {
        this.userService.setUserDetails(data);
        this.snackbar.success(this.msg, '');
      },
      (error) => {
        this.snackbar.error('Something went wrong', 'Try Again!');
      }
    );
  }
  editAddressDetails(address: address, id: number) {
    if (!this.isEditable) this.isEditable = !this.isEditable;
    this.presentAddress = address;
    this.presentIndex = id;
    console.log(this.presentAddress);
  }

  saveAddressDetails() {
    // this.presentAddress.pincode = Number.parseInt(this.presentAddress.pincode);
    if (this.presentIndex === -1) {
      if (this.currUser.address.length === 0) this.presentAddress.active = true;
      this.currUser.address.push(this.presentAddress);
      this.msg = 'New address added successfully';
    } else {
      this.currUser.address.splice(this.presentIndex, 1, this.presentAddress);
      this.msg = 'Address updated successfully';
    }
    this.isEditable = false;
    this.updateUser();
    console.log(this.currUser.address);
  }

  deleteAddressDetails(id: number) {
    this.currUser.address.splice(id, 1);
    this.msg = 'Address deleted successfully';
    this.updateUser();
  }

  addNewAddress() {
    if (!this.isEditable) this.isEditable = !this.isEditable;
    this.presentAddress = new address('', '', '', null, '', '', false);
    this.presentIndex = -1;
  }

  cancel() {
    this.presentAddress = new address('', '', '', null, '', '', false);
    this.isEditable = !this.isEditable;
    this.presentIndex = -1;
  }
}
