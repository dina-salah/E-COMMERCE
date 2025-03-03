import { TestBed } from '@angular/core/testing';

import { FrgtPassService } from './frgt-pass.service';

describe('FrgtPassService', () => {
  let service: FrgtPassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrgtPassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
