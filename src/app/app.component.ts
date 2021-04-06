import { Component } from '@angular/core';
import { DatabaseService } from './services/dummy/database.service';
import { TimerService } from './services/dummy/timer.service';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private errorController: ErrorService,
              private timerService: TimerService,
              private databaseService: DatabaseService) {
    if (this.databaseService.initDatabase()) {
      this.initTimer();
      console.log('Database connected successfully!');
    }
    else {
      console.error('Database connection unsuccessful!');
      this.errorController.createErrorAlert('Error en la base de datos');
    }
  }

  private initTimer() {
    const duration = 21; //time for alarm sound, refactor later
    setInterval(() => {
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
