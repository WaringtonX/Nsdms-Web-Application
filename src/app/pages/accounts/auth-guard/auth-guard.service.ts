import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/model/auth.model';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MersetaService } from 'src/app/service/merseta.service';
import { SharedFunctions } from 'src/app/shared/shared-functions';
import { AccountService } from '../account.service';
import { User } from 'src/app/model/users.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  roles = {
    'Super Administrator': [
      '/dashboard',
      '/forums',
      '/users',
      '/schools',
      '/my-calendar',
      '/subjects',
      '/settings',
      '/news',
      '/library',
      '/reset-password',
      '/update-account',
      '/event-calender',
    ],
    Administrator: [
      '/dashboard',
      '/teachers',
      '/learners',
      '/forums',
      '/assign-school-subjects-to-grades',
      '/settings',
      '/my-school',
      '/announcements',
      '/news',
      '/library',
      '/reset-password',
      '/update-account',
      '/event-calender',
    ],
    Teacher: [
      '/dashboard',
      '/peers',
      '/news',
      '/study-plans',
      '/assessments',
      '/take-assessment',
      'list-structure',
      'list-question',
      'list-answer',
      '/lessons',
      '/replay-lesson',
      '/live-lesson',
      '/news',
      '/library',
      '/forums',
      '/announcements',
      '/my-calendar',
      '/settings',
      '/my-school',
      '/reset-password',
      '/update-account',
      '/time-table',
      '/event-calender',
      '/add-subjects-for-grades',
    ],
    Tutor: [
      '/dashboard',
      '/peers',
      '/news',
      '/study-plans',
      '/assessments',
      '/announcements',
      '/my-calendar',
      '/lessons',
      '/replay-lesson',
      '/live-lesson',
      '/news',
      '/library',
      '/forums',
      '/settings',
      '/reset-password',
      '/update-account',
      '/time-table',
    ],
    Learner: [
      '/dashboard',
      '/peers',
      '/forums',
      '/study-plans',
      '/assessments',
      '/take-assessment',
      '/view-assessement-results',
      '/lessons',
      '/replay-lesson',
      '/live-lesson',
      '/news',
      '/library',
      '/settings',
      '/my-school',
      '/my-calendar',
      '/announcements',
      '/my-grades',
      '/reports',
      '/time-table',
      '/reset-password',
      '/update-account',
      '/event-calender',
    ],
    Support: [
      '/dashboard',
      '/forums',
      '/news',
      '/library',
      '/users',
      '/settings',
      '/reset-password',
      '/update-account',
    ],
  };
 // auth: any = this.MersetaService.uUser;
  user :User;
  constructor(
    private router: Router,
    private MersetaService: MersetaService,
    private shared: SharedFunctions,
    private accountService: AccountService,
  ) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
   // const token = this.auth.jwToken;
  //  const user: any = this.shared.deserialiseToken(token);
     var user = localStorage.getItem('currentuser');
    if (this.shared.isEmpty(user)) {
      this.accountService.clearSessionAndRedirect(true);
      return false;
    } 
    else
    {
    const role = user["role"];
    this.router.events
      .pipe(
        first((nav: any) => nav.url),
        map((nav) => (this.roles[role].indexOf(nav.url) > -1 ? true : nav.url))
      )
      .subscribe((res: any) => {
        if (res !== true) {
          // for child paths, app's RBAC needs refactoring
          let redirect = true;
          this.roles[role].forEach((element: any) => {
            if (res.indexOf(element) > -1) {
              redirect = false;
            }
          });
          if (redirect) {
            this.shared.navigateToInternal('login');
          }
        }
      });
      return true
    }

  //   const isOnTemporaryPassword = JSON.parse(
  //     user.isOnTemporaryPassword.toString().toLowerCase()
  //   );
  //   if (isOnTemporaryPassword) {
  //     setTimeout(() => {
  //       this.dialog.open(ChangePasswordModalComponent, {
  //         disableClose: true,
  //         data: user,
  //         width: '500px',
  //       });
  //     }, 1000);
  //   }
  //   return true;

   } 
}
