import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import Counter from '../models/Counter';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  counterList: Counter[] = [];
  counterListIndex = 0;
  
  constructor() { }

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

  setTimers() {
    return of(this.counterList);
  }
}
