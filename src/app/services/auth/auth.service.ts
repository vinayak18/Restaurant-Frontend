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
    const url = 'http://localhost:8083/api/v1/auth/user/login';
    return this.http
      .get(url, {
        headers: {
          authorization: this.createBasicAuthToken(
            loginObj.username,
            loginObj.password
          ),
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
