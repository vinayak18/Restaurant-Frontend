import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductDetailsComponent } from './components/menu/product-details/product-details.component';
import { ActiveOrderComponent } from './components/order/active-order/active-order.component';
import { OrderDetailsComponent } from './components/order/order-details/order-details.component';
import { PastOrderComponent } from './components/order/past-order/past-order.component';
import { SpecialDishesComponent } from './components/special-dishes/special-dishes.component';
import { AuthGuard } from './guard/auth.guard';
import { OrderConfirmationComponent } from './components/order/order-confirmation/order-confirmation.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { AccountComponent } from './components/account/account.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgetPasswordComponent } from './components/login/forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'account/:id',
    loadChildren: () =>
      import(`./components/account/account.module`).then(
        (m) => m.AccountModule
      ), //lazy loading
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'cart/checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order/active',
    component: ActiveOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order/past',
    component: PastOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order/active/details/:orderId',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order/past/details/:orderId',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order/confirmation',
    component: OrderConfirmationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'special-dishes',
    component: SpecialDishesComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'menu/product/:productId',
    component: ProductDetailsComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
