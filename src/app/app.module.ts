import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { QRCodeModule } from 'ng-qrcode';

import { AppComponent } from './app.component';
import { PaymentsService } from './payments.service';
import { NumeralPipe } from './numeral.pipe';
@NgModule({
  declarations: [
    AppComponent,
    NumeralPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    QRCodeModule
  ],
  exports: [
    NumeralPipe
  ],
  providers: [PaymentsService, NumeralPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
