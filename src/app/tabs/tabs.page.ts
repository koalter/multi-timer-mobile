import { Component } from '@angular/core';
import { TimerService } from '../services/dummy/timer.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private timerService: TimerService) {}

  private async openPicker() {
    await this.timerService.createTimerPicker();
  }
}
