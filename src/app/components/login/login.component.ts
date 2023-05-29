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
import { EncryptDecryptService } from 'src/app/services/auth/encrypt-decrypt.service';
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
  signIn: boolean = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  socialUser: SocialUser;
  userLogged: SocialUser;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private socialAuthService: SocialAuthService,
    private encrypt_decrypt: EncryptDecryptService,
    private router: Router // private oauthService: OauthService, // private tokenService: TokenService
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
    // window.fbAsyncInit = function () {
    //   FB.init({
    //     appId: '546100497690700',
    //     cookie: true,
    //     xfbml: true,
    //     version: 'v3.2',
    //   });

    //   FB.AppEvents.logPageView();
    // };

    // (function (d, s, id) {
    //   var js,
    //     fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) {
    //     return;
    //   }
    //   js = d.createElement(s);
    //   js.id = id;
    //   js.src = 'https://connect.facebook.net/en_US/sdk.js';
    //   fjs.parentNode.insertBefore(js, fjs);
    // })(document, 'script', 'facebook-jssdk');
    this.socialAuthService.authState.subscribe((data) => {
      this.userLogged = data;
      console.log(this.userLogged);
      this.signIn = true;
      let socialLoginToken = { value: this.userLogged.authToken };
      this.authService
        .fbAuthentication(this.userLogged.id, socialLoginToken)
        .subscribe(
          (data) => {
            console.log('Auth 200');
          },
          (err) => {
            console.log(err);
          }
        );
      if (null != this.userLogged && null != this.userLogged.idToken) {
        let socialLoginToken = { value: this.userLogged.idToken };
        this.authService
          .googleAuthentication(socialLoginToken)
          .subscribe((data) => {
            console.log(data);
            sessionStorage.setItem(
              this.encrypt_decrypt.encryption('Authorization', secretKey),
              this.encrypt_decrypt.encryption(data.token, secretKey)
            );
            console.log(data);
            this.userService
              .getUserViaEmail(data.username)
              .subscribe((user) => {
                console.log(user);
                sessionStorage.setItem(
                  this.encrypt_decrypt.encryption('UserDetails', secretKey),
                  this.encrypt_decrypt.encryption(
                    JSON.stringify(user.body),
                    secretKey
                  )
                );
              });
            this.authService.isLoggedIn.next(true);
            this.checkCartItems(data);
            this.router.navigateByUrl('/home');
          });
      } else if (null != this.userLogged) {
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
        sessionStorage.setItem(
          this.encrypt_decrypt.encryption('Authorization', secretKey),
          this.encrypt_decrypt.encryption(
            data.headers.get('Authorization'),
            secretKey
          )
        );
        console.log(data);
        this.userService
          .getUserViaEmail(data.body.username)
          .subscribe((user) => {
            sessionStorage.setItem(
              this.encrypt_decrypt.encryption('UserDetails', secretKey),
              this.encrypt_decrypt.encryption(
                JSON.stringify(user.body),
                secretKey
              )
            );
          });
        this.authService.isLoggedIn.next(true);
        this.checkCartItems(data.body);
        this.router.navigateByUrl('/home');
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
        .subscribe((data) => {
          sessionStorage.setItem(
            this.encrypt_decrypt.encryption('UserDetails', secretKey),
            this.encrypt_decrypt.encryption(
              JSON.stringify(data.body),
              secretKey
            )
          );
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

  signInWithFacebook(): void {
    const fbLoginOptions = {
      // scope:
      //   'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages,public_profile',
      scope: 'public_profile',
      locale: 'en_US',
      return_scopes: true,
      enable_profile_selector: true,
      // fields: 'name,email,picture,first_name,last_name,accounts',
      version: 'v13.0',
      // auth_type: 'rerequest',
    };
    this.socialAuthService.signIn(
      FacebookLoginProvider.PROVIDER_ID,
      fbLoginOptions
    );
    // .then((data) => {
    //   this.socialUser = data;
    //   console.log(this.socialUser);
    //   this.authService.isLoggedIn.next(true);
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
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }
}
