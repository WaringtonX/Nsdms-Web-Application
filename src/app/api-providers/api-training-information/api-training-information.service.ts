import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from 'src/app/model/program';
import { IUsertraining } from 'src/app/shared/models/IUsertraining';
import { SharedFunctions } from 'src/app/shared/shared-functions';
import { ApiProvider } from '../api';

@Injectable({
  providedIn: 'root'
})
export class ApiTrainingInformationService {

    constructor(public api: ApiProvider, private shared: SharedFunctions) {}

    public updateTraininginformation = (payload: IUsertraining,id: any): Observable<any> =>
      this.api.put(`User/UpdateTrainingInformation?id=${id}`, payload, {
        responseType: 'text',
      });



  }

