import { Injectable } from '@angular/core';
import { ApiProvider } from '../api';
import { EMPTY, Observable, of, throwError } from 'rxjs';
//import Swal from 'sweetalert2';
//import { IChangePassword } from '../../pages/account/models/password';

//import { ILogin } from '../../pages/account/models/ILogin';
import { IUser } from '../../shared/models/IUser';
//import { IVerificationCode } from '../../pages/account/models/IVerificationCode';
import { catchError, finalize } from 'rxjs/operators';
import { SharedFunctions } from '../../shared/shared-functions';
import { IUserAddress } from 'src/app/shared/models/IUserAddress';
import { ICompanyAddress } from 'src/app/shared/models/ICompanyAddress';
import { IUserCompany } from 'src/app/shared/models/IUserCompany';
import { IUsertraining } from 'src/app/shared/models/IUsertraining';
import { IStatus } from 'src/app/shared/models/IStatus';


@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    public api: ApiProvider,
    public shared: SharedFunctions,
   // public spinner: NgxSpinnerService
  ) {}

  public saveToken(accessToken: string): void {
    sessionStorage.setItem(this.shared.tokenName, accessToken);
  }
  public getToken(): string {
    return sessionStorage.getItem(this.shared.tokenName);
  }
  logout(isForced?: boolean) {
    if (isForced) {
      this.callLogout();
    } else {
     /* Swal.fire({
        title: 'Are you sure?',
        text: 'You will be redirected to the login page.',
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        cancelButtonColor: '#ef5350',
        confirmButtonText: 'Yes, logout!',
      }).then((result: any) => {
        if (result.value) {
          this.callLogout();
        }
      });
      */
    }
  }
  public clearSessionAndRedirect(isOnGuard: boolean = false) {
    this.shared.clearSessionAndRedirect(isOnGuard);
  }
  private callLogout() {
   // this.spinner.show();
    this.logoutFromApi()
      .pipe(
        catchError((err: any) => {
          const status = this.shared.getProp(['status'], err);
          if (![400, 401, 403, 404, 429].includes(status)) {
            return throwError(err);
          }
          return of(EMPTY);
        }),
        finalize(() => {
         // this.spinner.hide();
          this.clearSessionAndRedirect();
        })
      )
      .subscribe((logoutData) => {
       // this.spinner.hide();
        this.shared.showNotification('success', 'Successfully logged out');
        this.clearSessionAndRedirect();
      });
  }
  // api Endpoints
  public getAll = (p): Observable<any> =>
    this.api.get(`User`);
  //  this.api.get(`News?skip=${payload.skip}&take=${payload.take}`);
 // public login = (payload: ILogin): Observable<any> =>
  //  this.api.post('User/login', payload, { responseType: 'text' });
 /* public forgotPassword = (email: string): Observable<any> =>
    this.api.post(
      `User/forgotpassword?email=${email}`,
      {},
      { responseType: 'text' }
    );

  public changePassword = (payload: IChangePassword): Observable<any> =>
    this.api.post('User/resetpassword', payload, { responseType: 'text' });
  public verifyAccount = (payload: IVerificationCode): Observable<any> =>
    this.api.post('User/verifyaccount', payload, { responseType: 'text' });*/
  public updateAccount = (payload: IUser): Observable<any> =>
    this.api.put(`User/UpdatePersonalDetails?${payload.id}`, payload, {
      responseType: 'text',
    });

    public updateUserAddress = (payload: IUserAddress): Observable<any> =>
    this.api.put(`User/UpdateAddress?${payload.id}`, payload, {
      responseType: 'text',
    });

    public updateCompanyAddress = (payload:ICompanyAddress ): Observable<any> =>
    this.api.put(`User/CompanyAddress?${payload.id}`, payload, {
      responseType: 'text',
    });
    public updateUserCompany = (payload:IUserCompany ): Observable<any> =>
    this.api.put(`User/UpdateUserCompany?${payload.id}`, payload, {
      responseType: 'text',
    });
   /* public updateUsertraining= (payload:IUsertraining ): Observable<any> =>
    this.api.put(`User/UpdateTrainingInformation?${payload.id}`, payload, {
      responseType: 'text',
    });

    public updateProviderInformation?= (payload:IUsertraining ): Observable<any> =>
    this.api.put(`User/UpdateProviderInformation?${payload.id}`, payload, {
      responseType: 'text',
    });*/

    public updatestatus?= (payload:IStatus ): Observable<any> =>
    this.api.put(`User/updatestatus?${payload.id}`, payload, {
      responseType: 'text',
    });
 /* public resendVerificationCode = (
    payload: IVerificationCode
  ): Observable<any> =>
    this.api.post('User/resendVerificationCode', payload, {
      responseType: 'text',
    });*/
  public logoutFromApi = (): Observable<any> =>
    this.api.post(`User/logout`, {}, { responseType: 'text' });

  /*public activateOrDeactivate = (
    payload: IActivateOrDeactivate
  ): Observable<any> =>
    this.api.put(
      `accounts/activateOrDeactivate/${payload.id}`,
      { reason: payload.reason },
      {
        responseType: 'text',
      }
    );
*/

}
