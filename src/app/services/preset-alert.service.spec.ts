import { TestBed } from '@angular/core/testing';

import { PresetAlertService } from './preset-alert.service';

describe('PresetAlertService', () => {
  let service: PresetAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresetAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
