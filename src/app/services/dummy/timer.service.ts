import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import Counter from '../../models/Counter';
import Preset from '../../models/Preset';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  counterList: Counter[] = this.databaseService.getCounters();
  presetList: Preset[] = this.databaseService.getPresets();
  audio: HTMLAudioElement = new Audio('../assets/Kaibu.mp3');

  constructor(private databaseService: DatabaseService) { }

  newTimer(hour: string, minute: string, second: string, title?: string): boolean {
    let timer: Counter;
    
    if (parseInt(second) > 0 || parseInt(minute) > 0 || parseInt(hour) > 0) {
      const startTime = new Date(Date.now());
      const endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours() + parseInt(hour), startTime.getMinutes() + parseInt(minute), startTime.getSeconds() + parseInt(second));
      
      timer = {
        title: title,
        endTime: endTime.toISOString()
      };

      this.counterList.push(timer);
      this.databaseService.saveCounters(this.counterList);
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
    this.databaseService.savePresets(this.presetList);
  }

  setTimers() {
    return of(this.counterList);
  }
  
  public dismiss(counter: Counter) {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.counterList.splice(this.counterList.findIndex(c => c === counter), 1);
    this.databaseService.saveCounters(this.counterList);
  }

  public removePreset(preset: Preset) {
    this.presetList.splice(this.presetList.findIndex(p => p === preset), 1);
    this.databaseService.savePresets(this.presetList);
  }
}