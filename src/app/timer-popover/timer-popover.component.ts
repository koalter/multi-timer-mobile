import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import Counter from '../models/Counter';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer-popover',
  templateUrl: './timer-popover.component.html',
  styleUrls: ['./timer-popover.component.scss'],
})
export class TimerPopoverComponent implements OnInit {

  hours: number[] = Array<number>(24).fill(null);
  minutes: number[] = Array<number>(60).fill(null);
  seconds: number[] = Array<number>(60).fill(null);
  counterList: Counter[] = [];
  counterListIndex = 0;

  hour: string = '00';
  minute: string = '00';
  second: string = '00';

  constructor(private timerService: TimerService, private popoverController: PopoverController) {}

  ngOnInit(): void {
    for (let i = 0; i < this.hours.length; i++) {
      this.hours[i] = i;
    }
    for (let i = 0; i < this.minutes.length; i++) {
      this.minutes[i] = i;
      this.seconds[i] = i;
    }
  }

  hourChangeHandler(e) {
    this.hour = e.target.value;
  }

  minuteChangeHandler(e) {
    this.minute = e.target.value;
  }

  secondChangeHandler(e) {
    this.second = e.target.value;
  }

  addCounter(hour, minute, second) {
    this.timerService.newTimer(hour, minute, second);
    console.log(this.timerService.counterList)
    this.popoverController.dismiss();
  }

  toTimeString(time: Counter) {
    let seconds = time.seconds;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    let convertedString = hours.toLocaleString(undefined, { minimumIntegerDigits: 2, maximumFractionDigits: 0 })+":"+minutes.toLocaleString(undefined, { minimumIntegerDigits: 2, maximumFractionDigits: 0  })+":"+seconds.toLocaleString(undefined, { minimumIntegerDigits: 2, maximumFractionDigits: 0  });
    return convertedString;
  }
}
