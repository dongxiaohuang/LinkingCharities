import { TestBed, inject } from '@angular/core/testing';

import { SharedKeyService } from './shared-key.service';

describe('SharedKeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedKeyService]
    });
  });

  it('should be created', inject([SharedKeyService], (service: SharedKeyService) => {
    expect(service).toBeTruthy();
  }));
});
