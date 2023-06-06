import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/model/company.model';
import { SharedFunctions } from 'src/app/shared/shared-functions';
import { ApiProvider } from '../api';

@Injectable({
  providedIn: 'root'
})
export class ApiCompanyService {
    constructor(public api: ApiProvider, private shared: SharedFunctions) {}

    public updateProvider = (ProviderId: any,Userid: any): Observable<any> =>
      this.api.put(`User/UpdateUserCompany?companyId=${ProviderId}&id=${Userid}`, {
        responseType: 'text',
      });
      public updateEmployer = (companyId: any,Userid: any): Observable<any> =>
      this.api.put(`User/UpdateUserCompany?companyId=${companyId}&id=${Userid}`, {
        responseType: 'text',
      });


  }

