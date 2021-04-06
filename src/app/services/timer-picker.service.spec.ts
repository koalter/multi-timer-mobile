import { TestBed } from '@angular/core/testing';

import { TimerPickerService } from './timer-picker.service';

describe('TimerPickerService', () => {
  let service: TimerPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
