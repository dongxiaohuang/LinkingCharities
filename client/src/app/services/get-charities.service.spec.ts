import { TestBed, inject } from '@angular/core/testing';

import { GetCharitiesService } from './get-charities.service';

describe('GetCharitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCharitiesService]
    });
  });

  it('should be created', inject([GetCharitiesService], (service: GetCharitiesService) => {
    expect(service).toBeTruthy();
  }));
});
