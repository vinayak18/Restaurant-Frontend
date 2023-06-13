import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urls } from '../apiUrls';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  initiatePayment(payment: any): Observable<any> {
    const url = urls.userUrls.initiatePayment;
    return this.http.post(url, payment);
  }

  getOrderById(orderId: string): Observable<any> {
    const url = urls.userUrls.byOrderId.replace('{id}', orderId);
    return this.http.get(url);
  }

  getActiveOrders(userId: string): Observable<any> {
    const url = urls.userUrls.activeOrders.replace('{userId}', userId);
    return this.http.get(url);
  }

  getPastOrders(userId: string): Observable<any> {
    const url = urls.userUrls.pastOrders.replace('{userId}', userId);
    return this.http.get(url);
  }
}
