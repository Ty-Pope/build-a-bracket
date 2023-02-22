import { TestBed } from '@angular/core/testing';

import { BracketLogicService } from './bracket-logic.service';

describe('BracketLogicService', () => {
  let service: BracketLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BracketLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
