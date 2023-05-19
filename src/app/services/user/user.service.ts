import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncryptDecryptService } from '../auth/encrypt-decrypt.service';
import { urls } from '../apiUrls';
import { AuthService } from '../auth/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private decrypt: EncryptDecryptService,
    private auth: AuthService
  ) {}

  getUserViaEmail(email: string) {
    const url = urls.userUrls.byEmail.replace('{email}', '' + email);
    const jwt = this.auth.getAuthToken();
    this.http
      .get(url, {
        headers: {
          authorization: jwt,
        },
        observe: 'response',
        withCredentials: true,
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
