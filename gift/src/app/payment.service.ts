import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import{environment} from 'src/environment';
import { payment } from './data-type';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl =environment.JSONServerUrl+'payments';

  constructor(private http: HttpClient) { }

  storePayment(paymentData: payment) {
    return this.http.post(this.apiUrl, paymentData);
  }

  }





