import { Iwe7MenuService } from 'iwe7-layout';
import { map, switchMap, takeLast, tap } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { pluck } from 'rxjs/operators';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Directive, Output, EventEmitter, HostListener, Input, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { Iwe7JssdkService } from 'iwe7-jssdk';
import { Iwe7Url2Service } from 'iwe7-url';
import { PaymentContainerComponent } from '../payment-container/payment-container';
import { PaymentInfoComponent } from '../payment-info/payment-info';

@Directive({
    selector: '[payment]'
})
export class PaymentDirective {
    @Output() payment: EventEmitter<any> = new EventEmitter();
    @Input() paymentTid: string = '';

    @Input() paymentType: string = 'webchat';
    paymentAccount: any;
    subscription: any;
    @HostListener('tap', ['$event'])
    _tap(e: any) {
        this.paySetting();
    }
    constructor(
        public jssdk: Iwe7JssdkService,
        public url: Iwe7Url2Service,
        public http: HttpClient,
        public menu: Iwe7MenuService,
        public resolver: ComponentFactoryResolver,
        public cd: ChangeDetectorRef
    ) { }

    paySetting() {
        const url = this.url.getOpenUrl('paymentSetting');
        const list = [];
        this.http.get(url).pipe(
            pluck('data'),
            map(res => {
                const list = [];
                for (const key in res) {
                    const item = res[key];
                    list.push({
                        key: key,
                        item: item
                    });
                }
                return list;
            }),
            switchMap(res => {
                return from(res);
            }),
            filter(res => res.item.pay_switch),
            tap(res => {
                list.push(res);
            }),
            takeLast(1)
        ).subscribe(res => {
            const factory = this.resolver.resolveComponentFactory(PaymentContainerComponent);
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.subscription = this.menu.show('bottom', 270, factory, {
                list: list,
                type: this.paymentType
            }).subscribe(res => {
                if (res) {
                    this.paymentType = res.key;
                    this.paymentAccount = res.item;
                    setTimeout(() => {
                        this.payInfo();
                        this.cd.markForCheck();
                    }, 200);
                }
            });
            this.cd.markForCheck();
        });
    }

    payInfo() {
        const factory = this.resolver.resolveComponentFactory(PaymentInfoComponent);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.menu.show('bottom', 270, factory, {
            type: this.paymentType,
            account: this.paymentAccount
        }).subscribe(res => {
            console.log(res);
        });
    }
}
