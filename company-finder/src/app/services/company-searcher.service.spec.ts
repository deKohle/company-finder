import { TestBed } from '@angular/core/testing';

import { CompanySearcherService } from './company-searcher.service';

describe('CompanySearcherService', () => {
  let service: CompanySearcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanySearcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
