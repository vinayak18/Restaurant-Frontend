import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user-coupon-order/user.service';
import { userDetails } from '../../../models/userDetails';
import { address } from 'src/app/models/address';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(private userService: UserService) {}

  currUser: userDetails;
  primaryAddress: address;
  isEditable: boolean = false;

  ngOnInit(): void {
    this.currUser = this.userService.getCurrentUserDetails();
    if (this.currUser.address.length > 0) this.setPrimaryAddress();
  }
  saveChanges() {
    this.isEditable = !this.isEditable;
  }
  setPrimaryAddress() {
    for (let address of this.currUser.address) {
      if (address.active) {
        this.primaryAddress = address;
      }
    }
  }
}
