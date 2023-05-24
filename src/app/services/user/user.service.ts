import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncryptDecryptService } from '../auth/encrypt-decrypt.service';
import { urls } from '../apiUrls';
import { AuthService } from '../auth/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { secretKey } from 'src/app/components/models/secretKey';
import { product } from 'src/app/components/models/product';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private encrypt_decrypt: EncryptDecryptService,
    private auth: AuthService
  ) {
    const currUser = this.getCurrentUserDetails();
    if (null != currUser) {
      this.auth.isLoggedIn.next(true);
    }
  }

  getUserViaEmail(email: string): Observable<any> {
    const url = urls.userUrls.byEmail.replace('{email}', '' + email);
    const jwt = this.auth.getAuthToken();
    return this.http
      .get(url, {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
        observe: 'response',
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }
  getCurrentUserDetails() {
    let currUser = null;
    let data = sessionStorage.getItem(
      this.encrypt_decrypt.encryption('UserDetails', secretKey)
    );
    if (null != data) {
      currUser = JSON.parse(this.encrypt_decrypt.decryption(data, secretKey));
      console.log(currUser);
    }
    return currUser;
  }
  addToCartProducts(email: string, items: product[]): Observable<any> {
    const url = urls.userUrls.addToCart.replace('{email}', '' + email);
    const jwt = this.auth.getAuthToken();
    let isLoggedIn = false;
    this.auth.isLoggedIn.subscribe((data) => {
      isLoggedIn = data;
    });
    return this.http
      .put(url, items, {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
        observe: 'response',
        withCredentials: true,
        params: new HttpParams().set('isLoggedIn', isLoggedIn),
      })
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    console.log(error);
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
