/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiTrainingInformationService } from './api-training-information.service';

describe('Service: ApiTrainingInformation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiTrainingInformationService]
    });
  });

  it('should ...', inject([ApiTrainingInformationService], (service: ApiTrainingInformationService) => {
    expect(service).toBeTruthy();
  }));
});
