import {
  animate,
  state,
  style,
  transition,
  trigger,
  query,
  group,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginCredentials } from '../models/loginCredentials';
import { AuthService } from '../../services/auth/auth.service';
import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { userDetails } from '../models/userDetails';
import { EncryptDecryptService } from 'src/app/services/common/encrypt-decrypt.service';
import { secretKey } from '../models/secretKey';
import { UserService } from 'src/app/services/user/user.service';
import { product } from '../models/product';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('400ms ease', style({ opacity: 0 }))]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  switch: boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  socialUser: SocialUser;
  userLogged: SocialUser;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private socialAuthService: SocialAuthService,
    private encrypt_decrypt: EncryptDecryptService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        // Validators.pattern('^w+([.-]?w+)@w+([.-]?w+)(.w{2,3})+$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        // Validators.pattern('^[ A-Za-z0-9_@$!./#&+-]*$'),
      ]),
    });
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        // Validators.pattern('^w+([.-]?w+)@w+([.-]?w+)(.w{2,3})+$'),
      ]),
      phoneNo: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        // Validators.pattern('^[ A-Za-z0-9_@$!./#&+-]*$'),
      ]),
    });
    this.socialAuthService.authState.subscribe((data) => {
      this.userLogged = data;
      console.log(this.userLogged);
      if (null != this.userLogged) {
        let socialLoginToken = { value: this.userLogged.idToken };
        this.authService
          .googleAuthentication(socialLoginToken)
          .subscribe((data) => {
            console.log(data);
            this.authService.setAuthToken(data.token);
            this.getUser(data);
          });
      }
    });
  }
  
  toggle() {
    this.switch = !this.switch;
  }

  validateUser() {
    const loginObj = new loginCredentials(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    );
    this.authService.authenticate(loginObj).subscribe(
      (data) => {
        this.authService.setAuthToken(data.headers.get('Authorization'));
        this.getUser(data.body);
        console.log(data);
      },
      (err) => {
        console.log(err.status);
      }
    );
  }

  checkCartItems(user: any) {
    let cartItems: product[] = [];
    let data = sessionStorage.getItem(
      this.encrypt_decrypt.encryption('Cart', secretKey)
    );
    if (data !== null && data !== undefined) {
      cartItems = JSON.parse(this.encrypt_decrypt.decryption(data, secretKey));
      this.userService
        .addToCartProducts(user.username, cartItems)
        .subscribe((user) => {
          this.userService.setUserDetails(user.body);
        });
    }
  }

  registerUser() {
    const userObj = new userDetails(
      this.registerForm.get('name').value,
      this.registerForm.get('email').value,
      this.registerForm.get('phoneNo').value,
      this.registerForm.get('password').value
    );
    console.log(userObj);
    this.authService.registerUser(userObj).subscribe((data) => {
      this.toggle();
    });
  }

  getUser(data: any) {
    this.userService.getUserViaEmail(data.username).subscribe((user) => {
      console.log(user);
      this.userService.setUserDetails(user.body);
      this.authService.isLoggedIn.next(true);
      this.checkCartItems(data);
      this.router.navigateByUrl('/home');
    });
  }

  signInWithFacebook(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((data) => {
        this.socialUser = data;
        console.log(this.socialUser.authToken);
        // this.oauthService.facebook(tokenFace).subscribe(
        //   (res) => {
        //     this.tokenService.setToken(res.value);
        //     this.isLogged = true;
        //     this.router.navigate(['/']);
        //   },
        //   (err) => {
        //     console.log(err);
        //     this.logOut();
        //   }
        // );
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
