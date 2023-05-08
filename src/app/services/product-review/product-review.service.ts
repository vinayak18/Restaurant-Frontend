import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncryptDecryptService } from '../auth/encrypt-decrypt.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { urls } from 'src/app/services/apiUrls';
import { product } from 'src/app/components/models/product';
@Injectable({
  providedIn: 'root',
})
export class ProductReviewService {
  url: string = '';
  constructor(
    private http: HttpClient,
    private encryptDecrypt: EncryptDecryptService
  ) {}

  //product service apis
  getAllProducts(): Observable<product[]> {
    this.url = urls.productUrls.all;
    return this.http
      .get<product[]>(this.url)
      .pipe(catchError(this.handleError));
  }
  getProductById(pid: number): Observable<product> {
    this.url = urls.productUrls.byId.replace('{id}', '' + pid);
    console.log(this.url);
    return this.http.get<product>(this.url).pipe(catchError(this.handleError));
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
