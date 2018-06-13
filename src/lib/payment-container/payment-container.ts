import { Subscription } from 'rxjs';
import { LayoutOutletComponent } from 'iwe7-layout';
import { CustomComponent } from 'iwe7-core';
import { Component, Injector, ViewChild, Renderer2, ComponentFactoryResolver } from '@angular/core';
import { Iwe7MenuService } from 'iwe7-layout';

@Component({
    selector: 'payment-container',
    templateUrl: 'payment-container.html',
    styleUrls: ['./payment-container.scss']
})
export class PaymentContainerComponent extends CustomComponent<any> {
    list: any[] = [];
    @ViewChild(LayoutOutletComponent) layout: LayoutOutletComponent;
    current: string = 'credit';
    subscription: Subscription;
    constructor(
        injector: Injector,
        public render: Renderer2,
        public menu: Iwe7MenuService,
        public resolver: ComponentFactoryResolver
    ) {
        super(injector);
        this.run(() => {
            this.list = this._customData.list;
        });
        this.getCyc('ngOnInit').subscribe(res => {
            this.layout.showHeader();
        });
    }

    ngHover(e: any, index: number) {
        if (e.type === 'start') {
            this.render.addClass(e.ele, 'active');
        } else {
            this.render.removeClass(e.ele, 'active');
            const data = e.data;
            this.current = data.key;
            this._customClose(data);
            this._cd.markForCheck();
        }
    }

    next() {
        const data = this.list.find(res => {
            return res.key === this.current;
        });
        this._customClose(data);
    }

    cancel() {
        this._customClose();
    }
}
