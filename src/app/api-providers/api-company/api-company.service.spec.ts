/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiCompanyService } from './api-company.service';

describe('Service: ApiCompany', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiCompanyService]
    });
  });

  it('should ...', inject([ApiCompanyService], (service: ApiCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
