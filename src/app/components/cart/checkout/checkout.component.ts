import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { order } from 'src/app/components/models/order';
import { status } from 'src/app/components/models/status';
import { foodType } from 'src/app/components/models/foodType';
import { address } from 'src/app/components/models/address';
import { customerInfo } from 'src/app/components/models/customerInfo';
import { product } from 'src/app/components/models/product';

/**
 * @title Stepper responsive
 */
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  editable = true;
  discountAmount: number = 0;
  breakfastList: product[] = [];
  lunchList: product[] = [];
  dinnerList: product[] = [];
  specialDishList: product[] = [];
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
      orderId: null,
      userId: null,
      dateOfOrder: null,
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
      actualAmount: 0,
      tax: 0,
      deliveryFee: 0,
      coupon: {
        couponCode: 'DEFAULT0',
        discountAmount: 0,
      },
      netAmount: 0,
      deliveryType: null,
      customerInfo: null,
      status: status.ACCEPTED,
      payment: 'UPI',
      rating: 5,
    };
    this.breakfastList = this.orderSummary.orderDetails.filter(
      (value) => value.type === foodType.BREAKFAST
    );
    this.lunchList = this.orderSummary.orderDetails.filter(
      (value) => value.type === foodType.LUNCH
    );
    this.dinnerList = this.orderSummary.orderDetails.filter(
      (value) => value.type === foodType.DINNER
    );
    this.specialDishList = this.orderSummary.orderDetails.filter(
      (value) => value.type === foodType.SPEACIAL_DISH
    );
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
  setDefaultAddress() {
    let defaultAddress = new address(
      '207, Bangur Avenue',
      '',
      'Akash Sutra Lane',
      700055,
      'West Bengal',
      'Kolkata'
    );
    return defaultAddress;
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
    } else {
      deliveryAddress = this.setDefaultAddress();
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
      this.getTotalAmount();
    }
    if (event.selectedIndex != 1 && this.secondFormGroup.valid) {
      this.deliverySwitch = false;
    }
  }
  getTotalAmount() {
    let totalAmount = 0;
    for (let product of this.orderSummary.orderDetails) {
      totalAmount = totalAmount + product.price * product.quantity;
    }
    this.orderSummary.actualAmount = totalAmount;
    this.calculateTax();
  }
  calculateTax() {
    let tax =
      (this.orderSummary.actualAmount -
        this.orderSummary.coupon.discountAmount) *
      0.05;
    this.orderSummary.tax = tax;
    this.setNetTotal();
  }
  setNetTotal() {
    this.orderSummary.netAmount =
      this.orderSummary.actualAmount -
      this.orderSummary.coupon.discountAmount +
      this.orderSummary.tax +
      this.orderSummary.deliveryFee;
  }
  validateCouponCode(code: string) {
    alert(code);
    this.orderSummary.coupon = {
      couponCode: code,
      discountAmount: 160,
    };
    this.calculateTax();
  }
  placeOrder(stepper: MatStepper) {
    this.orderSummary.orderId = '12345';
    this.orderSummary.dateOfOrder = 'October 16, 2:57 PM';
    stepper.next();
    this.editable = false;
  }
}
