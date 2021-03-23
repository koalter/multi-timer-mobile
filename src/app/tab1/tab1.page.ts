import { Component } from '@angular/core';
import Counter from '../models/Counter';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  counterList: Counter[] = [];
  counterListIndex = 0;

  constructor(private timerService: TimerService) { }

}
