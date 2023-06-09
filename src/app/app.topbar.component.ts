import { Component, ElementRef, ViewChild } from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent } from '@angular/animations';
import { MegaMenuItem } from 'primeng/api';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { Router } from '@angular/router';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    animations: [
        trigger('topbarActionPanelAnimation', [
            transition(':enter', [
                style({opacity: 0, transform: 'scaleY(0.8)'}),
                animate('.12s cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 1, transform: '*' })),
              ]),
              transition(':leave', [
                animate('.1s linear', style({ opacity: 0 }))
              ])
        ])
    ]
})
export class AppTopBarComponent {

    constructor(public appMain: AppMainComponent, public app: AppComponent, private router: Router) {
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
        console.log('End');
    }

    activeItem: number;

    model: MegaMenuItem[] = [
        {
            label: 'Dashboard',
            items: [
                [
                    {
                        label: 'Learner Management',
                        items: [
                            { label: 'Learners', icon: 'pi pi-fw pi-id-card', routerLink: ['/'] },
                           // { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                           // { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                            //{ label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'] },
                           // { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] }
                        ]
                    }
                ],
                [
                    {
                        label: 'Process Management',
                        items: [
                            { label: 'Process List', icon: 'pi pi-fw pi-table', routerLink: ['/'] },
                           // { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                           // { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                           // { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                           // { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] }
                        ]
                    }
                ],
               /* [
                    {
                        label: 'UI KIT 3',
                        items: [
                            { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                            { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                            { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
                            { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                            { label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc'] }
                        ]
                    }
                ]*/
            ]
        },
       /* {
            label: '',
            items: [
                [
                    {
                        label: 'UTILITIES 1',
                        items: [
                            { label: 'Icons', icon: 'pi pi-fw pi-prime', routerLink: ['utilities/icons'] },
                            { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://www.primefaces.org/primeflex/', target: '_blank' }
                        ]
                    }
                ],

            ]
        }*/
    ];

    @ViewChild('searchInput') searchInputViewChild: ElementRef;

    onSearchAnimationEnd(event: AnimationEvent) {
        switch(event.toState) {
            case 'visible':
                this.searchInputViewChild.nativeElement.focus();
            break;
        }
    }
}
