import { Component, HostListener, OnInit } from '@angular/core';
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
import { CouponService } from 'src/app/services/user-coupon-order/coupon.service';
import { coupon } from '../../models/coupon';
import { SnackbarService } from 'src/app/services/common/snackbar.service';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { OrderService } from 'src/app/services/user-coupon-order/order.service';
import { ActivatedRoute } from '@angular/router';
import { userDetails } from '../../models/userDetails';
import { UserService } from 'src/app/services/user-coupon-order/user.service';
import { EncryptDecryptService } from 'src/app/services/common/encrypt-decrypt.service';
import { secretKey } from '../../models/secretKey';
declare var Razorpay: any;

/**
 * @title Stepper responsive
 */
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  currUser: userDetails;
  stripePromise = loadStripe(environment.stripe);
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
    private breakpointObserver: BreakpointObserver,
    private couponService: CouponService,
    private orderService: OrderService,
    private snackbarService: SnackbarService,
    private userService: UserService,
    private encrypt: EncryptDecryptService
  ) {
    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
  ngOnInit(): void {
    this.currUser = this.userService.getCurrentUserDetails();
    this.firstFormGroup = this._formBuilder.group({
      userId: [this.currUser.userId, Validators.required],
      name: [this.currUser.name, Validators.required],
      email: [this.currUser.email, Validators.required],
      phoneNo: [
        this.currUser.phoneNo != '0' ? this.currUser.phoneNo : '',
        Validators.required,
      ],
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
      orderDetails: this.currUser.cart,
      actualAmount: 0,
      tax: 0,
      deliveryFee: 0,
      coupon: {
        couponCode: 'DEFAULT0',
        totalAmount: 1000,
        discountAmount: 0,
      },
      netAmount: 0,
      deliveryType: null,
      customerInfo: null,
      status: status.ACCEPTED,
      paymentType: 'UPI',
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
      (value) => value.type === foodType.SPECIAL_DISH
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
    const couponData = {
      couponCode: code,
      totalAmount: this.orderSummary.actualAmount,
    };
    this.couponService.getCouponViaCode(couponData).subscribe(
      (data) => {
        this.orderSummary.coupon = data;
        this.calculateTax();
      },
      (err) => {
        this.snackbarService.error('Invalid Coupon Code', '');
        this.orderSummary.coupon = new coupon('DEFAULT0', 0, 0);
        this.calculateTax();
      }
    );
  }

  onPaymentViaRazorPay(stepper: MatStepper) {
    sessionStorage.setItem(
      this.encrypt.encryption('Order Summary', secretKey),
      this.encrypt.encryption(JSON.stringify(this.orderSummary), secretKey)
    );
    console.log(stepper);
    const payment = {
      name: 'Total Amount',
      currency: 'inr',
      amount: this.orderSummary.netAmount,
      quantity: '1',
      cancelUrl: 'https://localhost:4200/cart/checkout',
      successUrl: 'https://localhost:4200/order/confirmation',
    };
    let options = {
      key: '',
      amount: '',
      name: 'AMMA KI KADAI',
      description: 'Web Development',
      image: '../../../assets/img/hero-1.jpg',
      order_id: '',
      handler: function (response) {
        var event = new CustomEvent('payment.success', {
          detail: response,
          bubbles: true,
          cancelable: true,
        });
        window.dispatchEvent(event);
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      notes: {
        address: '',
      },
      theme: {
        color: '#ffb633',
      },
    };
    let paymentId = '';
    let error = '';
    this.orderService.createOrder(payment).subscribe(
      (data) => {
        options.key = data.secretId;
        options.order_id = data.razorpayOrderId;
        options.amount = data.applicationFee; //paise
        options.prefill.name = 'SMN';
        options.prefill.email = 'smn@gmail.com';
        options.prefill.contact = '7980581501';

        var rzp = new Razorpay(options);
        rzp.open();

        rzp.on('payment.failed', function (response) {
          // Todo - store this information in the server
          console.log(response);
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason;
        });
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event): void {
    console.log('x');
    console.log(event.detail);
  }
  async placeOrder(stepper: MatStepper) {
    sessionStorage.setItem(
      this.encrypt.encryption('Order Summary', secretKey),
      this.encrypt.encryption(JSON.stringify(this.orderSummary), secretKey)
    );
    console.log(stepper);
    const payment = {
      name: 'Total Amount',
      email: this.orderSummary.customerInfo.email,
      currency: 'inr',
      amount: this.orderSummary.netAmount,
      quantity: '1',
      cancelUrl: 'https://localhost:4200/cart/checkout',
      successUrl: 'https://localhost:4200/order/confirmation',
    };
    let options = {
      key: '',
      amount: '',
      name: 'AMMA KI KADAI',
      description: 'Web Development',
      image: '../../../assets/img/hero-1.jpg',
      order_id: '',
      handler: function (response) {
        var event = new CustomEvent('payment.success', {
          detail: response,
          bubbles: true,
          cancelable: true,
        });
        window.dispatchEvent(event);
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      notes: {
        address: '',
      },
      theme: {
        color: '#ffb633',
      },
    };
    let paymentId = '';
    let error = '';
    this.orderService.createOrder(payment).subscribe((data) => {
      options.key = data.secretId;
      options.order_id = data.razorpayOrderId;
      options.amount = data.applicationFee; //paise
      options.prefill.name = 'SMN';
      options.prefill.email = 'smn@gmail.com';
      options.prefill.contact = '7980581501';

      let opts = {
        key_id: 'rzp_test_iIK24lb6Jfiw1d',
        key_secret: 'jPnZBzdunoEp3VGad6gbw2ft',
      };
      var rzp = new Razorpay(opts);
      console.log(rzp);
      var x = rzp.paymentLink.create({
        upi_link: true,
        amount: 500,
        currency: 'INR',
        accept_partial: false,
        first_min_partial_amount: 100,
        description: 'For XYZ purpose',
        customer: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '+919000090000',
        },
        notify: {
          sms: true,
          email: true,
        },
        reminder_enable: true,
        notes: {
          policy_name: 'Jeevan Bima',
        },
      });

      //     rzp.open();

      //     rzp.on('payment.failed', function (response) {
      //       // Todo - store this information in the server
      //       console.log(response);
      //       console.log(response.error.code);
      //       console.log(response.error.description);
      //       console.log(response.error.source);
      //       console.log(response.error.step);
      //       console.log(response.error.reason);
      //       console.log(response.error.metadata.order_id);
      //       console.log(response.error.metadata.payment_id);
      //       this.error = response.error.reason;
      //     });
      //   },
      //   (err) => {
      //     console.log(err.error.message);
      //   }
      // );

      //}

      // @HostListener('window:payment.success', ['$event'])
      // onPaymentSuccess(event): void {
      //   console.log('x');
      //   console.log(event.detail);
      // }
      // async placeOrder(stepper: MatStepper) {
      //   sessionStorage.setItem(
      //     this.encrypt.encryption('Order Summary', secretKey),
      //     this.encrypt.encryption(JSON.stringify(this.orderSummary), secretKey)
      //   );
      //   console.log(stepper);
      //   const payment = {
      //     name: 'Total Amount',
      //     email: this.orderSummary.customerInfo.email,
      //     currency: 'inr',
      //     amount: this.orderSummary.netAmount,
      //     quantity: '1',
      //     cancelUrl: 'https://localhost:4200/cart/checkout',
      //     successUrl: 'https://localhost:4200/order/confirmation',
      //   };
      //   const stripe = await this.stripePromise;

      //   this.orderService.initiatePayment(payment).subscribe((data: any) => {
      //     // I use stripe to redirect To Checkout page of Stripe platform
      //     console.log(data);
      //     stripe.redirectToCheckout({
      //       sessionId: data.id,
      //     });
      //   });
      //   (async () => {
      //     const { paymentIntent, error } = await stripe.confirmCardPayment(
      //       environment.stripe
      //     );
      //     if (error) {
      //       // Handle error here
      //     } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      //       // Handle successful payment here
      //       console.log(paymentIntent);
      //       this.orderSummary.orderId = '12345';
      //       // this.orderSummary.dateOfOrder = 'October 16, 2:57 PM';
      //       stepper.next();
      //       this.editable = false;
      //     }
      //   })();
      /*
    this.orderService.createOrder(payment).subscribe((data) => {
      console.log(data);
      var instance = new Razorpay({
        key_id: data.secretId,
        key_secret: data.secretKey,
      });

      var x = instance.paymentLink.create({
        upi_link: true,
        amount: 500,
        currency: 'INR',
        accept_partial: false,
        first_min_partial_amount: 100,
        description: 'For XYZ purpose',
        customer: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '+919000090000',
        },
        notify: {
          sms: true,
          email: true,
        },
        reminder_enable: true,
        notes: {
          policy_name: 'Jeevan Bima',
        },
      });
      console.log(x);*/
    });
  }
}
