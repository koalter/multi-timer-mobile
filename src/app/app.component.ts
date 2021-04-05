import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { TimerService } from './services/timer.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private timerService: TimerService,
              private databaseService: DatabaseService) {
    const duration = 21; //time for alarm sound, refactor later
    const timer = setInterval(() => {
      console.log(new Date(Date.now()).toTimeString())
      for (let counter of this.timerService.counterList) {
        if (Math.floor(Date.parse(new Date(counter.endTime).toISOString())/1000) - Math.floor(Date.now()/1000) <= 0) this.timerService.audio.play()
        .then(() => {
          if (Math.floor(Date.parse(new Date(counter.endTime).toISOString())/1000 + duration) - Math.floor(Date.now()/1000) <= 0) {
            this.timerService.dismiss(counter);
          }
        });
      }
    }, 1000);
  }
}
