import { TestBed, inject } from '@angular/core/testing';

import { AuthCharityService } from './auth-charity.service';

describe('AuthCharityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthCharityService]
    });
  });

  it('should be created', inject([AuthCharityService], (service: AuthCharityService) => {
    expect(service).toBeTruthy();
  }));
});
