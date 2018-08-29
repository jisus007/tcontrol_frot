import { TestBed, inject } from '@angular/core/testing';

import { AutenticationService } from './autentication.service';

describe('AutenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutenticationService]
    });
  });

  it('should be created', inject([AutenticationService], (service: AutenticationService) => {
    expect(service).toBeTruthy();
  }));
});
