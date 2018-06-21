import { TestBed, inject } from '@angular/core/testing';

import { GetCoverPicsService } from './get-cover-pics.service';

describe('GetCoverPicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCoverPicsService]
    });
  });

  it('should be created', inject([GetCoverPicsService], (service: GetCoverPicsService) => {
    expect(service).toBeTruthy();
  }));
});
