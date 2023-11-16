import { TestBed } from '@angular/core/testing';

import { CardContentService } from './card-content.service';

describe('CardContentService', () => {
  let service: CardContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
