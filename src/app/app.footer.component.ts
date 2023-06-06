import {Component} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-footer',
    template: `
      <!--  <div class="layout-footer flex align-items-center p-4 shadow-2">
            <img id="footer-logo" [src]="'assets/layout/images/footer-' + (app.layoutMode === 'light' ? 'ultima' : 'ultima-dark') + '.svg'" alt="ultima-footer-logo">
            <button pButton pRipple type="button" icon="pi pi-github fs-large" class="p-button-rounded p-button-text p-button-plain" [ngClass]="{'ml-auto mr-2': !app.isRTL, 'ml-2 mr-auto': app.isRTL}"></button>
            <button pButton pRipple type="button" icon="pi pi-facebook fs-large" class="p-button-rounded p-button-text p-button-plain" [ngClass]="{'mr-2': !app.isRTL, 'ml-2': app.isRTL}"></button>
            <button pButton pRipple type="button" icon="pi pi-twitter fs-large" class="p-button-rounded p-button-text p-button-plain" [ngClass]="{'mr-2': !app.isRTL, 'ml-2': app.isRTL}"></button>
        </div>-->
        <div class="row">
    <div class="col-md-10 col-lg-10 text-center">
      <p style="color:#977949;">
        Copyright &copy;<script>document.write(new Date().getFullYear());</script>NSDMS by <a href="https://www.merseta.org.za/" target="_blank">merSETA</a>
        </p>
    </div>
  </div>
    `
})
export class AppFooterComponent {
    constructor(public app: AppComponent) {}
}
