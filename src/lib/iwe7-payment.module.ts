import { PaymentInfoComponent } from './payment-info/payment-info';
import { Iwe7OnHoverModule } from 'iwe7-on-hover';
import { Iwe7NavbarModule } from 'iwe7-navbar';
import { Iwe7LayoutModule } from 'iwe7-layout';
import { PaymentContainerComponent } from './payment-container/payment-container';
import { CommonModule } from '@angular/common';
import { PaymentDirective } from './payment/payment';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    Iwe7LayoutModule,
    Iwe7NavbarModule,
    Iwe7OnHoverModule
  ],
  declarations: [PaymentDirective, PaymentContainerComponent, PaymentInfoComponent],
  exports: [PaymentDirective, PaymentContainerComponent, PaymentInfoComponent],
  entryComponents: [
    PaymentContainerComponent,
    PaymentInfoComponent
  ]
})
export class Iwe7PaymentModule { }
