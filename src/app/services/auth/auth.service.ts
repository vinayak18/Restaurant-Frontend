import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { loginCredentials } from 'src/app/components/models/loginCredentials';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { catchError } from 'rxjs/operators';
import { userDetails } from 'src/app/components/models/userDetails';
import { urls } from '../apiUrls';
import { secretKey } from 'src/app/components/models/secretKey';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fbAuthentication(id: string, token: any): Observable<any> {
    const url = urls.userUrls.socialFbLogin.replace('{id}', '' + id);
    return this.http.post(url, token).pipe(catchError(this.handleError));
  }
  isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    private encrypt_decrypt: EncryptDecryptService
  ) {}
  registerUser(userObj: userDetails): Observable<any> {
    const url = urls.userUrls.register;
    return this.http.post(url, userObj).pipe(catchError(this.handleError));
  }
  authenticate(loginObj: loginCredentials): Observable<any> {
    const url = urls.userUrls.login;
    return this.http
      .get(url, {
        headers: {
          authorization: this.createBasicAuthToken(
            loginObj.username,
            loginObj.password
          ),
          'X-Requested-With': 'XMLHttpRequest',
        },
        observe: 'response',
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }
  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }
  googleAuthentication(token: any): Observable<any> {
    const url = urls.userUrls.socialGoogleLogin;
    return this.http.post(url, token).pipe(catchError(this.handleError));
  }
  getAuthToken(): string {
    return this.encrypt_decrypt.decryption(
      sessionStorage.getItem(
        this.encrypt_decrypt.encryption('Authorization', secretKey)
      ),
      secretKey
    );
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
