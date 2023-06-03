import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user-coupon-order/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  firstName: string = '';
  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((value) => {
      this.isLoggedIn = value;
      if (this.isLoggedIn) {
        const currUser = this.userService.getCurrentUserDetails();
        this.firstName = currUser.name.split(' ')[0];
      }
    });
  }

  async logout(): Promise<void> {
    // For app-user sign out logic we have used try-catch to prevent getting error from social-login-user sign out
    try {
      await this.socialAuthService.signOut(true);
    } catch (error) {
      console.log(error);
    }
    sessionStorage.clear();
    this.authService.isLoggedIn.next(false);
    this.router.navigateByUrl('/login');
  }
}
