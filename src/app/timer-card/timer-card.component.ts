import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Counter from '../models/Counter';

@Component({
  selector: 'app-timer-card',
  templateUrl: './timer-card.component.html',
  styleUrls: ['./timer-card.component.scss'],
})
export class TimerCardComponent implements OnInit {

  @Input() counter: Counter;
  @Output() dismissEvent: EventEmitter<Counter> = new EventEmitter<Counter>();

  constructor() { }

  ngOnInit() {}

  toTimeString(time: string): string {
    let hours = '00';
    let minutes = '00';
    let seconds = '00';
    let remainingTime = Math.ceil((Date.parse(time) - Date.now()) / 1000);

    if (remainingTime > 0) {
      hours = Math.floor(remainingTime / 3600).toLocaleString(undefined, { minimumIntegerDigits: 2, maximumFractionDigits: 0 });
      remainingTime = remainingTime % 3600;
      minutes = Math.floor(remainingTime / 60).toLocaleString(undefined, { minimumIntegerDigits: 2, maximumFractionDigits: 0 });
      remainingTime = remainingTime % 60;
      seconds = Math.floor(remainingTime).toLocaleString(undefined, { minimumIntegerDigits: 2, maximumFractionDigits: 0 });
    }

    const convertedString = `${hours}:${minutes}:${seconds}`;
    return convertedString;
  }

  btn_descartar_click() {
    this.dismissEvent.emit(this.counter);
  }
}
