import { TestBed } from '@angular/core/testing';

import { NotifTestServiceService } from './notif-test-service.service';

describe('NotifTestServiceService', () => {
  let service: NotifTestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifTestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
