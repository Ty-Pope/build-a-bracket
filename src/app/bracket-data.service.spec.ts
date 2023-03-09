import { TestBed } from '@angular/core/testing';

import { BracketDataService } from './bracket-data.service';

describe('BracketDataService', () => {
  let service: BracketDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BracketDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
