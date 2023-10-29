import { TestBed } from '@angular/core/testing';

import { DevisServiceService } from './devis-service.service';

describe('DevisServiceService', () => {
  let service: DevisServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevisServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
