import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AppMainComponent } from './app.main.component';
import { AppComponent } from './app.component';
import { Auth } from './model/auth.model';
import { MersetaService } from './service/merseta.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-inline-menu',
    templateUrl: './app.inlinemenu.component.html',
    animations: [
        trigger('menu', [
            state('hiddenAnimated', style({
                height: '0px',
                paddingBottom: '0px',
                overflow: 'hidden'
            })),
            state('visibleAnimated', style({
                height: '*',
                overflow: 'visible'
            })),
            state('visible', style({
                opacity: 1,
                'z-index': 100
            })),
            state('hidden', style({
                opacity: 0,
                'z-index': '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('visible => hidden', animate('.1s linear')),
            transition('hidden => visible', [style({transform: 'scaleY(0.8)'}), animate('.12s cubic-bezier(0, 0, 0.2, 1)')])
        ])
    ]
})
export class AppInlineMenuComponent  implements OnInit{

    @Input() key = 'inline-menu';

    @Input() style: any;

    @Input() styleClass: string;

    active: boolean;
    auth:Auth;

    role: any;
    email: any;
    name: any;

    constructor(public appMain: AppMainComponent, public app: AppComponent, private mersetaservice: MersetaService, private router: Router,private ref: ChangeDetectorRef) {
     
     }
   
    ngOnInit(): void {
       this.showhUserdata();
       
    }

    onClick(event) {
        this.appMain.onInlineMenuClick(event, this.key);
        event.preventDefault();
    }

    showhUserdata() {
        this.role = this.mersetaservice.uRoleLifecycle;
        this.email  = this.mersetaservice.uEmail;
        this.name = this.mersetaservice.uName;
        this.ref.detectChanges();
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('uRoleLifecycle');
        localStorage.removeItem('uName');
        localStorage.removeItem('uEmail');
        localStorage.removeItem('user_ID');
        localStorage.removeItem('currentuser');
        console.log(localStorage.getItem('token'));
        this.router.navigate(['/login']);

    }

    get isTooltipDisabled() {
        return !(this.appMain.isSlim() && !this.appMain.isMobile());
    }

    get tabIndex() {
        return !this.appMain.inlineMenuActive  ? '-1' : null;
    }

    isHorizontalActive() {
       return this.appMain.isHorizontal() && !this.appMain.isMobile();
    }
}
