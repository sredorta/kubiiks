import { TestBed } from '@angular/core/testing';

import { KiiLanguageService } from './kii-language.service';

describe('KiiLanguageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KiiLanguageService = TestBed.get(KiiLanguageService);
    expect(service).toBeTruthy();
  });
});
