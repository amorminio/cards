import { TestBed } from '@angular/core/testing';

import { SyslogService } from './syslog.service';

describe('SyslogService', () => {
  let service: SyslogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyslogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
