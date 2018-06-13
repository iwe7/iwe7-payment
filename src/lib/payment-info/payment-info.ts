import { pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Iwe7Url2Service } from 'iwe7-url';
import { LayoutOutletComponent } from 'iwe7-layout';
import { Injector, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { CustomComponent } from 'iwe7-core';
import { Iwe7JssdkService } from 'iwe7-jssdk';

@Component({
    selector: 'payment-info',
    templateUrl: 'payment-info.html',
    styleUrls: ['./payment-info.scss']
})
export class PaymentInfoComponent extends CustomComponent<any> {
    @ViewChild(LayoutOutletComponent) layout: LayoutOutletComponent;
    paymentTid: any;
    constructor(
        injector: Injector,
        public url: Iwe7Url2Service,
        public http: HttpClient,
        public jssdk: Iwe7JssdkService
    ) {
        super(injector);
        this.getCyc('ngOnInit').subscribe(res => {
            this.layout.showHeader();
        });
    }

    pay() {
        const url = this.url.getOpenUrl('payment', { tid: this.paymentTid });
        this.http.get(url).pipe(
            pluck('data')
        ).subscribe(res => {
            this.jssdk.chooseWXPay(res).subscribe(res => {
                console.log(res);
            });
        });
    }

    cancel() {
        this._customClose();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
