import { TestBed } from '@angular/core/testing';

import { DataEncryptedService } from './data-encrypted.service';

describe('DataEncryptedService', () => {
  let service: DataEncryptedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataEncryptedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
