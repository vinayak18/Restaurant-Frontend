import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { urls } from 'src/app/services/apiUrls';
import { product } from 'src/app/components/models/product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = '';
  constructor(private http: HttpClient) {}

  //product service apis
  getBestSellers(pid: number): Observable<product[]> {
    const url = urls.productUrls.bestseller.replace('{pid}', '' + pid);
    return this.http.get<product[]>(url);
  }

  getAllProducts(): Observable<product[]> {
    this.url = urls.productUrls.all;
    return this.http.get<product[]>(this.url);
  }

  getProductById(pid: number): Observable<product> {
    this.url = urls.productUrls.byId.replace('{pid}', '' + pid);
    console.log(this.url);
    return this.http.get<product>(this.url);
  }

  getProductByFoodType(foodType: string): Observable<product[]> {
    this.url = urls.productUrls.byFoodType.replace('{foodtype}', '' + foodType);
    return this.http.get<product[]>(this.url);
  }
}
