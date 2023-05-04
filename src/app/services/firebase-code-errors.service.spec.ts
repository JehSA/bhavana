import { TestBed } from '@angular/core/testing';

import { FirebaseCodeErrorsService } from './firebase-code-errors.service';

describe('FirebaseCodeErrorsService', () => {
  let service: FirebaseCodeErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseCodeErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
