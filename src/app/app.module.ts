import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { SpecialDishesComponent } from './components/special-dishes/special-dishes.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderDetailsComponent } from './components/order/order-details/order-details.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamComponent } from './components/team/team.component';
import { ReviewComponent } from './components/review/review.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ProductDetailsComponent } from './components/menu/product-details/product-details.component';
import { ActiveOrderComponent } from './components/order/active-order/active-order.component';
import { PastOrderComponent } from './components/order/past-order/past-order.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from '@abacritt/angularx-social-login';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { ToastrModule } from 'ngx-toastr';
import { HttpHeaderInterceptor } from './interceptors/http-header.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

const fbLoginOptions = {
  scope: 'public_profile',
  locale: 'en_US',
  return_scopes: true,
  enable_profile_selector: true,
  version: 'v13.0',
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    SpecialDishesComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    MenuComponent,
    LoginComponent,
    OrderDetailsComponent,
    TeamComponent,
    ReviewComponent,
    FeedbackComponent,
    ProductDetailsComponent,
    ActiveOrderComponent,
    PastOrderComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    MatMenuModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    NgbCarouselModule,
    CoolSocialLoginButtonsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-position-custom',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '84327651763-g6d73dojmkdb24qcnl9pniq0dd5rc5o8.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '546100497690700',
              fbLoginOptions
            ),
          },
        ],
        onError: (error) => {
          console.error(error);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
