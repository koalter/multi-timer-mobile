import { Component } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { TimerService } from './services/timer.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // audio: HTMLAudioElement = new Audio('../assets/bensound-creativeminds.mp3');

  constructor(private audio: NativeAudio,
              private timerService: TimerService) {
    this.audio.preloadComplex('alarm', '../assets/bensound-creativeminds.mp3', 1, 1, 0).then(() => {

      const timer = setInterval(() => {
        console.log(new Date(Date.now()).toTimeString())
        for (let counter of this.timerService.counterList) {
          if (Math.floor(Date.parse(new Date(counter.endTime).toISOString())/1000) - Math.floor(Date.now()/1000) <= 0) this.audio.play('alarm').then(() => {
            if (Math.floor(Date.parse(new Date(counter.endTime).toISOString())/1000 + 10) - Math.floor(Date.now()/1000) <= 0) {
              this.audio.stop('alarm').then(() => {
                this.timerService.counterList.splice(this.timerService.counterList.findIndex(c => c === counter), 1);
              });
            }
          });
        }
      }, 1000);
    });
  }
}
