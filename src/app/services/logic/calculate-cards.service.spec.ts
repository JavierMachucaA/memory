import { TestBed } from '@angular/core/testing';

import { CalculateCardsService } from './calculate-cards.service';

describe('CalculateCardsService', () => {
  let service: CalculateCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
