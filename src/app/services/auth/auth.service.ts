import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { urls } from 'src/app/models/apiUrls';
import { loginCredentials } from 'src/app/models/loginCredentials';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
