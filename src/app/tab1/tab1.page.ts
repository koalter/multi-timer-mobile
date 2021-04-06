import { Component } from '@angular/core';
import Counter from '../models/Counter';
import { TimerService } from '../services/dummy/timer.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  hours: string = '';
  minutes: string = '';
  seconds: string = '';
  counterList: Counter[] = [];
  counterListIndex = 0;

  constructor(private timerService: TimerService) { }

  private btn_Agregar() {
    this.timerService.newTimer(this.hours === '' ? '00' : this.hours, this.minutes === '' ? '00' : this.minutes, this.seconds === '' ? '00' : this.seconds);
    this.hours = '';
    this.minutes = '';
    this.seconds = '';
  }

  private dismiss(counter: Counter) {
    this.timerService.dismiss(counter);
  }
}
