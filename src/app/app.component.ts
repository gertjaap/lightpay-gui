import { Component } from '@angular/core';
import { PaymentModel } from './models/paymentmodel';
import { PaymentsService } from './payments.service';
import { Currency } from './models/currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  payment : PaymentModel = null;
  currencies : Currency[] = [];
  selectedCurrency : Currency = null;
  paymentJsonValue : string = "";
  paymentComplete : boolean = false;
  constructor(private paymentsService : PaymentsService) {
    paymentsService.getPayment().subscribe((payment) => {
      this.paymentsService.getCurrencies().subscribe((curr) => {
        this.currencies = curr;
        this.payment = payment;
      });
      
    });

    this.paymentsService.paymentComplete.subscribe((payment) => {
      if(this.payment.id == payment.id) {
        this.paymentComplete = true;
        setTimeout(this.reset.bind(this), 5000);
      }
    })
  }

  reset() {
    this.payment = null;
    this.paymentComplete = false;
    this.paymentJsonValue = "";
    this.selectedCurrency = null;
  }
  
  selectCurrency(currency : Currency) { 
    this.selectedCurrency = currency;
    var payment = {
      amount : payment.amount * currency.rate,
      currency : currency.symbol,
      recipient : 'ln123456789000987654321acbcfbaefbce'
    }
    this.paymentJsonValue = JSON.stringify(payment);
  }
}
