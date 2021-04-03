import { Component } from '@angular/core';
import { TimerService } from './services/timer.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private timerService: TimerService) {
    const timer = setInterval(() => {
      console.log(new Date(Date.now()).toTimeString())
      for (let counter of this.timerService.counterList) {
        if (Math.floor(Date.parse(new Date(counter.endTime).toISOString())/1000) - Math.floor(Date.now()/1000) <= 0) this.timerService.audio.play().then(() => {
          if (Math.floor(Date.parse(new Date(counter.endTime).toISOString())/1000 + 10) - Math.floor(Date.now()/1000) <= 0) {
            this.timerService.audio.pause();
            this.timerService.counterList.splice(this.timerService.counterList.findIndex(c => c === counter), 1);
          }
        });
      }
    }, 1000);
  }
}
