import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaymentModel } from './models/paymentmodel';
import { Currency } from './models/currency';
import * as io from "socket.io-client";

@Injectable()
export class PaymentsService {
  paymentComplete : EventEmitter<PaymentModel> = new EventEmitter<PaymentModel>();
  payment : BehaviorSubject<PaymentModel> = new BehaviorSubject<PaymentModel>(null);
  socket : any;

  constructor(private http: HttpClient) { 
    this.socket = io.connect();
    this.socket.on('newPayment', (data) => {
      this.payment.next(data);
    });
    this.socket.on('paymentComplete', (data) => {
      this.paymentComplete.emit({id : data.id });
    });
  }

  getPayment() : Observable<any> {
    return this.payment.asObservable();
  }

  getCurrencies() : Observable<Currency[]> {
    return this.http.get<Currency[]>('/backend/currencies');
  }
}
