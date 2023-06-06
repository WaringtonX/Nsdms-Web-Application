import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedFunctions } from '../shared/shared-functions';
import { AccountService } from '../api-providers/api-account/api-account.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiIntercepterService implements HttpInterceptor {
  private token: string;
  constructor(
    private accountService: AccountService,
    private shared: SharedFunctions
  ) {
    this.token = this.accountService.getToken();
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.shared.isEmpty(this.token)) {
      if (req.url.includes(environment.apiBase)) {
        req = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${this.token}`),
        });
      }
    }
    return next.handle(req);
  }
}
