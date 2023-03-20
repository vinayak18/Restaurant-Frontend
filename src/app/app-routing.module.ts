import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProductDetailsComponent } from './menu/product-details/product-details.component';
import { ActiveOrderComponent } from './order/active-order/active-order.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { OrderComponent } from './order/order.component';
import { PastOrderComponent } from './order/past-order/past-order.component';
import { SpecialDishesComponent } from './special-dishes/special-dishes.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
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
    path: 'order/active',
    component: ActiveOrderComponent,
  },
  {
    path: 'order/past',
    component: PastOrderComponent,
  },
  {
    path: 'order/details/:orderId',
    component: OrderDetailsComponent,
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
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
