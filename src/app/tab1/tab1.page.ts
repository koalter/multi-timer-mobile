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

  newTimer(hour, minute, second) {
    let newList = this.counterList.slice();
    let timer: Counter;
    
    if (parseInt(second) > 0 || parseInt(minute) > 0 || parseInt(hour) > 0) {
      timer = { 
        seconds: parseInt(second)+parseInt(minute)*60+parseInt(hour)*60*60, 
        interval: setInterval(() => {
          if (timer.seconds > 0) timer.seconds--;
          else clearInterval(timer.interval);
        }, 1000) 
      };
      newList.push(timer);
      
      this.counterList = newList;
    }
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
