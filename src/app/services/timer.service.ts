import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx'
import { of } from 'rxjs';
import Counter from '../models/Counter';
import Preset from '../models/Preset';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  counterList: Counter[] = this.databaseService.getCounters();
  presetList: Preset[] = this.databaseService.getPresets();

  constructor(private databaseService: DatabaseService,
              private nativeAudio: NativeAudio) {
    this.nativeAudio.preloadComplex('alarm', '../assets/Kaibu.mp3', 1, 1, 0)
    .then(audio => console.log(audio))
    .catch(err => console.error(err));
  }

  newTimer(hour: string, minute: string, second: string, title?: string): boolean {
    let timer: Counter;
    
    if (parseInt(second) > 0 || parseInt(minute) > 0 || parseInt(hour) > 0) {
      const startTime = new Date(Date.now());
      const endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours() + parseInt(hour), startTime.getMinutes() + parseInt(minute), startTime.getSeconds() + parseInt(second));
      
      timer = {
        title: title,
        endTime: endTime.toISOString()
      };

      this.databaseService.saveCounter(timer);
      this.counterList.push(timer);
      return true;
    }
    return false;
  }

  newPreset(title: string, hours: number, minutes: number, seconds: number) {
    const preset: Preset = {
      title: title,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }

    this.presetList.push(preset);
    this.databaseService.savePreset(preset);
  }

  setTimers() {
    return of(this.counterList);
  }

  public playAudio() {
    return this.nativeAudio.play('alarm');
  }
  
  public dismiss(counter: Counter) {
    this.nativeAudio.stop('alarm').then(() =>{
      this.counterList.splice(this.counterList.findIndex(c => c === counter), 1);
      this.databaseService.saveCounters(this.counterList);
    }).catch(err => console.error(err));
  }

  public removePreset(preset: Preset) {
    this.presetList.splice(this.presetList.findIndex(p => p === preset), 1);
    this.databaseService.savePresets(this.presetList);
  }
}
