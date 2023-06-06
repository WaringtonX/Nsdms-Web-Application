import { Injectable } from '@angular/core';
//import { ApiProvider } from '../api';
import { EMPTY, Observable, of, throwError } from 'rxjs';
//import Swal from 'sweetalert2';
//import { IChangePassword } from '../../accounts/models/password';
//import { ILogin } from '../../accounts/models/ILogin';
//import { IUser } from '../../shared/models/IUser';
//import { IRegister } from '../../accounts/models/IRegister';
//import { IVerificationCode } from '../../accounts/models/IVerificationCode';
import { catchError, finalize } from 'rxjs/operators';
import { SharedFunctions } from 'src/app/shared/shared-functions';
//import { NgxSpinnerService } from 'ngx-spinner';
//import { IPagination } from '../../shared/models/IPagination';
//import { IActivateOrDeactivate } from '../../shared/models/IDeactivateOrActivate';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    public shared: SharedFunctions
  ) {}

  public saveToken(accessToken: string): void {
    sessionStorage.setItem(this.shared.tokenName, accessToken);
  }
  public getToken(): string {
    return sessionStorage.getItem(this.shared.tokenName);
  }
  // logout(isForced?: boolean) {
  //   if (isForced) {
  //     this.callLogout();
  //   } else {
  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: 'You will be redirected to the login page.',
  //       showCancelButton: true,
  //       confirmButtonColor: '#007bff',
  //       cancelButtonColor: '#ef5350',
  //       confirmButtonText: 'Yes, logout!',
  //     }).then((result: any) => {
  //       if (result.value) {
  //         this.callLogout();
  //       }
  //     });
  //   }
  // }
  public clearSessionAndRedirect(isOnGuard: boolean = false) {
    this.shared.clearSessionAndRedirect(isOnGuard);
  }
  // private callLogout() {
  //   this.spinner.show();
  //   this.logoutFromApi()
  //     .pipe(
  //       catchError((err: any) => {
  //         const status = this.shared.getProp(['status'], err);
  //         if (![400, 401, 403, 404, 429].includes(status)) {
  //           return throwError(err);
  //         }
  //         return of(EMPTY);
  //       }),
  //       finalize(() => {
  //         this.spinner.hide();
  //         this.clearSessionAndRedirect();
  //       })
  //     )
  //     .subscribe((logoutData) => {
  //       this.spinner.hide();
  //       this.shared.showNotification('success', 'Successfully logged out');
  //       this.clearSessionAndRedirect();
  //     });
  // }
  // // api Endpoints
  // public getAll = (payload: IPagination): Observable<any> =>
  //   this.api.get(`accounts/GetAll?skip=${payload.skip}&take=${payload.take}`);
  // public login = (payload: ILogin): Observable<any> =>
  //   this.api.post('Accounts/login', payload, { responseType: 'text' });
  // public forgotPassword = (email: string): Observable<any> =>
  //   this.api.post(
  //     `Accounts/forgotpassword?email=${email}`,
  //     {},
  //     { responseType: 'text' }
  //   );
  // public uploadProfilePicture = (
  //   file: any,
  //   fileName: string
  // ): Observable<any> => {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file, fileName);
  //   formData.append('fileName', fileName);
  //   return this.api.post('Accounts/uploadProfilePicture', formData, {
  //     responseType: 'text',
  //   });
  // };
  // public changePassword = (payload: IChangePassword): Observable<any> =>
  //   this.api.post('Accounts/resetpassword', payload, { responseType: 'text' });
  // public registerAccount = (payload: IRegister): Observable<any> =>
  //   this.api.post('Accounts/register', payload, { responseType: 'text' });
  // public verifyAccount = (payload: IVerificationCode): Observable<any> =>
  //   this.api.post('Accounts/verifyaccount', payload, { responseType: 'text' });
  // public updateAccount = (payload: IUser): Observable<any> =>
  //   this.api.put(`Accounts/update/${payload.id}`, payload, {
  //     responseType: 'text',
  //   });
  // public resendVerificationCode = (
  //   payload: IVerificationCode
  // ): Observable<any> =>
  //   this.api.post('Accounts/resendVerificationCode', payload, {
  //     responseType: 'text',
  //   });
  // public logoutFromApi = (): Observable<any> =>
  //   this.api.post(`accounts/logout`, {}, { responseType: 'text' });

  // public activateOrDeactivate = (
  //   payload: IActivateOrDeactivate
  // ): Observable<any> =>
  //   this.api.put(
  //     `accounts/activateOrDeactivate/${payload.id}`,
  //     { reason: payload.reason },
  //     {
  //       responseType: 'text',
  //     }
  //   );
}
