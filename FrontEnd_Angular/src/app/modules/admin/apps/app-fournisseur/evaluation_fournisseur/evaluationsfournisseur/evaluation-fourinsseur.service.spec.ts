import { TestBed } from '@angular/core/testing';

import { EvaluationFourinsseurService } from './evaluation-fourinsseur.service';

describe('EvaluationFourinsseurService', () => {
  let service: EvaluationFourinsseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationFourinsseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
