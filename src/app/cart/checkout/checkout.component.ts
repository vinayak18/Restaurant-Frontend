import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { order } from 'src/app/models/order';
import { status } from 'src/app/models/status';
import { foodType } from 'src/app/models/foodType';
import { address } from 'src/app/models/address';
import { customerInfo } from 'src/app/models/customerInfo';

/**
 * @title Stepper responsive
 */
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  deliverySwitch: boolean = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  orderSummary: order;
  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      userId: ['#123', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNo: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      deliveryType: ['Delivery', Validators.required],
      streetAddress: ['', Validators.required],
      flatNo: ['', Validators.required],
      landmark: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
    });
    this.orderSummary = {
      orderId: '12342',
      userId: '#1',
      dateOfOrder: 'October 16, 2:57 PM',
      orderDetails: [
        {
          pId: 1,
          name: 'Boba Tea',
          desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
          price: 200,
          quantity: 2,
          avgRating: 4.5,
          img_url: [
            '../../assets/img/breakfast-1.jpg',
            '../../assets/img/hero-1.jpg',
            '../../assets/img/hero-2.jpg',
            '../../assets/img/hero-3.jpg',
          ],
          type: foodType.SPEACIAL_DISH,
          catagory: 'VEG',
          live: true,
        },
        {
          pId: 1,
          name: 'Pizza',
          desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
          price: 200,
          quantity: 2,
          avgRating: 4.5,
          img_url: [
            '../../assets/img/breakfast-1.jpg',
            '../../assets/img/hero-1.jpg',
            '../../assets/img/hero-2.jpg',
            '../../assets/img/hero-3.jpg',
          ],
          type: foodType.SPEACIAL_DISH,
          catagory: 'VEG',
          live: true,
        },
        {
          pId: 1,
          name: 'Pizza',
          desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
          price: 200,
          quantity: 2,
          avgRating: 4.5,
          img_url: [
            '../../assets/img/breakfast-1.jpg',
            '../../assets/img/hero-1.jpg',
            '../../assets/img/hero-2.jpg',
            '../../assets/img/hero-3.jpg',
          ],
          type: foodType.LUNCH,
          catagory: 'VEG',
          live: true,
        },
        {
          pId: 1,
          name: 'Boba Tea',
          desc: 'Amazingly fresh and squisly flavorable choco chips are added in it',
          price: 200,
          quantity: 2,
          avgRating: 4.5,
          img_url: [
            '../../assets/img/breakfast-1.jpg',
            '../../assets/img/hero-1.jpg',
            '../../assets/img/hero-2.jpg',
            '../../assets/img/hero-3.jpg',
          ],
          type: foodType.BREAKFAST,
          catagory: 'VEG',
          live: true,
        },
      ],
      actualAmount: 1600.0,
      taxRate: 5,
      deliveryFee: 0,
      couponCode: null,
      netAmount: 0,
      deliveryType: null,
      customerInfo: null,
      status: status.ACCEPTED,
      payment: 'UPI',
      rating: 5,
    };
  }
  toggleDeliverySwitch(deliveryType: string) {
    if (deliveryType === 'Pick-Up') {
      this.deliverySwitch = false;
    } else {
      this.deliverySwitch = true;
    }
    this.secondFormGroup.value.deliveryType = deliveryType;
  }
  updatePersonalInfo() {
    this.orderSummary.userId = this.firstFormGroup.value.userId;
    let personalInfo = new customerInfo(
      this.firstFormGroup.value.name,
      this.firstFormGroup.value.email,
      this.firstFormGroup.value.phoneNo,
      null
    );
    this.orderSummary.customerInfo = personalInfo;
    console.log(this.orderSummary);
  }
  updateAddress() {
    if (this.secondFormGroup.valid) {
      this.deliverySwitch = false;
    }
    this.orderSummary.deliveryType = this.secondFormGroup.value.deliveryType;
    let deliveryAddress = null;
    if (this.orderSummary.deliveryType === 'Delivery') {
      deliveryAddress = new address(
        this.secondFormGroup.value.streetAddress,
        this.secondFormGroup.value.flatNo,
        this.secondFormGroup.value.landmark,
        this.secondFormGroup.value.pincode,
        this.secondFormGroup.value.state,
        this.secondFormGroup.value.city
      );
    }
    this.orderSummary.customerInfo.deliveryAddress = deliveryAddress;
    console.log(this.orderSummary);
  }
  selectionChange(event: any) {
    if (event.selectedIndex == 1) {
      if (this.secondFormGroup.value.deliveryType === 'Delivery') {
        this.deliverySwitch = true;
      }
      this.updatePersonalInfo();
    } else if (event.selectedIndex == 2) {
      this.updateAddress();
    }
    if (event.selectedIndex != 1 && this.secondFormGroup.valid) {
      this.deliverySwitch = false;
    }
  }
}
