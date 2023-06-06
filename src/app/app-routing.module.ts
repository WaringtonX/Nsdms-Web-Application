import {RouterModule, Routes} from '@angular/router';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {DashboardComponent} from './demo/view/dashboard.component';
import {DashboardAnalyticsComponent} from './demo/view/dashboardanalytics.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import { AppLoginComponent } from './pages/accounts/login/app.login.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {IconsComponent} from './utilities/icons.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';
import {BlocksComponent} from './blocks/blocks/blocks.component';
import {AppWizardComponent} from './pages/app.wizard.component';
import {AppContactusComponent } from './pages/app.contactus.component';
import { ForgotPasswordComponent } from './pages/accounts/forgot-password/forgot-password.component';
import {AppNewlearnerComponent } from './pages/app.newlearner.component';
import {AppProccesslistComponent } from './pages/app.proccesslist.component';
import { AppLearnersComponent } from './pages/app.learners.component';
import {AppLearnerDetailsComponent } from './pages/app.learnerdetails.component';
import { AppLearnershipComponent } from './pages/learnership/app.learnership.component';
import {AppUpdateLearnerStatusComponent } from './pages/app.updatelearnerstatus.component';
import {AppRecomendApprovalComponent } from './pages/app.recomendapproval.component';
import {AppDocViewerComponent } from './pages/view/app.docviewer.component';
import { PasswordResetComponent } from './pages/accounts/password-reset/password-reset.component';
import { AppEditlearnerComponent } from './pages/app.editlearner.component';
import { AssessorModeratorComponent } from './pages/assessor-moderator/app.assessormoderator.component';
import { LearnerAssessmentComponent } from './pages/assessor-moderator/learner-assessment/app.learnerassessment.component';
import { RegisterComponent } from './pages/accounts/register/register.component';
import { AppLearnerAssessmentModeration } from './pages/assessor-moderator/assessment-moderation/app.learnerassessmentmoderation.component';
import { AppExternalModeration } from './pages/assessor-moderator/external-moderation/app.externalmoderation.component';
import { TasklistComponent } from './pages/tasklist/tasklist.component';
import { AuthGuardService } from './pages/accounts/auth-guard/auth-guard.service';
import { AppSORManagement } from './pages/assessor-moderator/sor-management/app.sormanagement.component';
import { AppSingleDocView } from './pages/view/singledocview/app.singledocview.component';
import { AppModerationRejectionComponent } from './pages/assessor-moderator/assessment-moderationrejection/app.moderationrejection.component';
import { MersetaService } from './service/merseta.service';
import { Children } from 'preact/compat';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {path:'',redirectTo:'login',pathMatch:'full'},
            {
                path: 'main', component: AppMainComponent, canActivate:[AuthGuardService],

                children: [
                    {path: 'dashboard', component: DashboardComponent},
                    {path: 'favorites/dashboardanalytics', component: DashboardAnalyticsComponent},
                    {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                    {path: 'uikit/input', component: InputDemoComponent},
                    {path: 'uikit/button', component: ButtonDemoComponent},
                    {path: 'uikit/table', component: TableDemoComponent},
                    {path: 'uikit/list', component: ListDemoComponent},
                    {path: 'uikit/tree', component: TreeDemoComponent},
                    {path: 'uikit/panel', component: PanelsDemoComponent},
                    {path: 'uikit/overlay', component: OverlaysDemoComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./demo/view/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/media', component: MediaDemoComponent},
                    {path: 'uikit/message', component: MessagesDemoComponent},
                    {path: 'uikit/misc', component: MiscDemoComponent},
                    {path: 'uikit/cha   rts', component: ChartsDemoComponent},
                    {path: 'uikit/file', component: FileDemoComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'pages/crud', component: AppCrudComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'pages/invoice', component: AppInvoiceComponent},
                    {path: 'pages/help', component: AppHelpComponent},
                    {path: 'pages/empty', component: EmptyDemoComponent},
                    {path: 'documentation', component: DocumentationComponent},
                    {path: 'blocks', component: BlocksComponent},
                    {path: 'newlearner', component : AppNewlearnerComponent},
                    {path: 'processlist', component : AppProccesslistComponent},
                    {path: 'tasklist', component : TasklistComponent},
                    {path: 'learners', component : AppLearnersComponent},
                    {path: 'learnerdetails/:id/:compid/:taskid', component : AppLearnerDetailsComponent},
                    {path: 'editlearner/:id/:compid', component : AppEditlearnerComponent},
                    {path: 'learnership', component : AppLearnershipComponent},
                    {path: "updatelearnerstatus/:id/:compid",component: AppUpdateLearnerStatusComponent},
                    {path: "recomendapprove/:id/:compid", component: AppRecomendApprovalComponent},
                    {path: "docviewer/:docid/:uid/:target",component: AppDocViewerComponent},
                    {path: "assessment",component: AssessorModeratorComponent},
                    {path: 'learnerassessment/:id/:compid/:type', component : LearnerAssessmentComponent},
                    {path: 'register', component: RegisterComponent},
                    {path: 'moderation/:assesqualid/:compid', component: AppLearnerAssessmentModeration},
                    {path: 'externalmoderation/:assessmentbacthid/:spdid/:taskid', component: AppExternalModeration},
                    {path: 'sormanagement/:assessmentbacthid/:spdid/:taskid', component: AppSORManagement},
                    {path: 'moderationrejection/:assessmentbacthid/:spdid/:taskid', component: AppModerationRejectionComponent},
                    {path: 'singledocview/:userid/:targetkey', component: AppSingleDocView},
                ]
            },
            {path: 'error', component: AppErrorComponent},

            {path: 'access', component: AppAccessdeniedComponent},

            {path: 'notfound', component: AppNotfoundComponent},

            {path: 'login', component: AppLoginComponent},

            //{path: 'register', component: RegisterComponent},

            {path: 'forgot-password', component: ForgotPasswordComponent},

            {path: 'password-reset', component: PasswordResetComponent},

            {path: 'wizard', component: AppWizardComponent},

            {path: 'contactus', component: AppContactusComponent},

            {path: '**', redirectTo: '/notfound'},

            {path: '*',redirectTo: '/dashboard'},//added
        ], {useHash: true }),
        
    ], 
    exports: [RouterModule],
})
export class AppRoutingModule {
}
