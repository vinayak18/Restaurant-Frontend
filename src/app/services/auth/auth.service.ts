import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { loginCredentials } from 'src/app/components/models/loginCredentials';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    private encryptDecrypt: EncryptDecryptService
  ) {}
  authenticate(loginObj: loginCredentials): Observable<any> {
    const url =
      'http://localhost:3000/user?email=' +
      loginObj.username +
      '&password=' +
      loginObj.password;
    return this.http.get(url).pipe(catchError(this.handleError));
  }
  googleAuthentication(token: any): Observable<any> {
    const url = 'http://localhost:8083/api/v1/auth/google/login';
    return this.http.post(url, token).pipe(catchError(this.handleError));
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
