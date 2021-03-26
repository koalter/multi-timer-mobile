import { Component, Input } from '@angular/core';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'timer-fab',
  templateUrl: './timer-fab.component.html',
  styleUrls: ['./timer-fab.component.scss'],
})
export class TimerFabComponent {

  @Input() vertical: string;
  @Input() horizontal: string;
  @Input() slot: string;

  constructor(private timerService: TimerService) { console.log(this.vertical, this.horizontal, this.slot)}

  private async openPicker() {
    await this.timerService.createTimerPicker();
  }
}
