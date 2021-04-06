import { Component } from '@angular/core';
import { TimerPickerService } from '../services/timer-picker.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private timerPickerService: TimerPickerService) {}

  private async openPicker() {
    await this.timerPickerService.createTimerPicker();
  }
}
