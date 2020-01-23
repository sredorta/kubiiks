import { TestBed } from '@angular/core/testing';

import { StateTransferService } from './state-transfer.service';

describe('StateTransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateTransferService = TestBed.get(StateTransferService);
    expect(service).toBeTruthy();
  });
});
