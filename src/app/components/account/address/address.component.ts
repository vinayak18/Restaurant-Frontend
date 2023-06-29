import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userDetails } from 'src/app/models/userDetails';
import { UserService } from 'src/app/services/user-coupon-order/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  addressFormGroup: FormGroup;
  currUser: userDetails;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.currUser = this.userService.getCurrentUserDetails();
    this.addressFormGroup = this.formBuilder.group({
      streetAddress: ['', Validators.required],
      flatNo: ['', Validators.required],
      landmark: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
    });
  }
}
