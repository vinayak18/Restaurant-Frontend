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
    private socialAuthService: SocialAuthService,
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
    this.socialAuthService.authState.subscribe((data) => {
      this.userLogged = data;
      console.log(this.userLogged);
      if (null != this.userLogged) {
        let socialLoginToken = { value: this.userLogged.idToken };
        this.authService
          .googleAuthentication(socialLoginToken)
          .subscribe((data) => {
            console.log(data);
            this.authService.isLoggedIn.next(true);
            this.router.navigateByUrl('/home');
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
        sessionStorage.setItem(
          'Authorization',
          data.headers.get('Authorization')!
        );
        console.log(data);
        this.authService.isLoggedIn.next(true);
        this.router.navigateByUrl('/home');
      },
      (err) => {
        console.log(err.status);
      }
    );
  }
  registerUser() {
    alert(this.registerForm.get('email').value);
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
