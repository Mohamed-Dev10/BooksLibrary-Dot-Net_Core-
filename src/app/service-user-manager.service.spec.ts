import { TestBed } from '@angular/core/testing';

import { ServiceUserManagerService } from './service-user-manager.service';

describe('ServiceUserManagerService', () => {
  let service: ServiceUserManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUserManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
