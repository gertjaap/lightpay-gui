import { Component } from '@angular/core';
import { PaymentModel, PaymentModelCryptoAmount } from './models/paymentmodel';
import { PaymentsService } from './payments.service';
import { Currency } from './models/currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  payment : PaymentModel = null;
  cryptoPayment : PaymentModelCryptoAmount = null;
  paymentJsonValue : string = "";
  paymentComplete : boolean = false;
  constructor(private paymentsService : PaymentsService) {
    paymentsService.getPayment().subscribe((payment) => {
        this.payment = payment;
        if(this.payment != null)
          console.log(this.payment.id);
    });

    this.paymentsService.paymentComplete.subscribe((payment) => {
      if(this.payment != null && this.payment.id == payment.id) {
        this.paymentComplete = true;
        setTimeout(this.reset.bind(this), 5000);
      }
    })
  }

  reset() {
    this.payment = null;
    this.paymentComplete = false;
    this.paymentJsonValue = "";
    this.cryptoPayment = null;
  }
  
  selectCurrency(currency : PaymentModelCryptoAmount) { 
    this.cryptoPayment = currency;
    var payment = {
      id : this.payment.id,
      amount : this.cryptoPayment.amount,
      currency : this.cryptoPayment.symbol,
      recipient : 'ln123456789000987654321acbcfbaefbce'
    }
    this.paymentJsonValue = JSON.stringify(payment);
  }
}
