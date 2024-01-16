import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { order } from './data-type';
import{environment} from 'src/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl =environment.JSONServerUrl+'orders';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<order[]> {
    return this.http.get<order[]>(this.apiUrl);
  }

  cancelOrder(orderId: string): Observable<any> {
    const cancelUrl = `${this.apiUrl}/${orderId}`;
    return this.http.delete(cancelUrl);
  }

}
