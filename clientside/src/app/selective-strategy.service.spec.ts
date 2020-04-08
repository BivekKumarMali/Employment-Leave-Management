import { TestBed } from '@angular/core/testing';

import { SelectiveStrategy } from './selective-strategy.service';

describe('SelectiveStrategyService', () => {
  let service: SelectiveStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectiveStrategy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
