import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { of } from 'rxjs';
import Counter from '../models/Counter';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  hours: number = 24;
  minutes: number = 60;
  seconds: number = 60;

  counterList: Counter[] = [];
  audio: HTMLAudioElement = new Audio('../assets/bensound-creativeminds.mp3');
  
  constructor(private pickerController: PickerController,
              private router: Router) { }

  newTimer(hour: string, minute: string, second: string): boolean {
    let newList = this.counterList.slice();
    let timer: Counter;
    
    if (parseInt(second) > 0 || parseInt(minute) > 0 || parseInt(hour) > 0) {
      const startTime = new Date(Date.now());
      const endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours() + parseInt(hour), startTime.getMinutes() + parseInt(minute), startTime.getSeconds() + parseInt(second));
      
      timer = {
        endTime: endTime.toISOString()
      };
      newList.push(timer);
      
      this.counterList = newList;
      return true;
    }
    return false;
  }

  setTimers() {
    return of(this.counterList);
  }

  async createTimerPicker() {
    const picker = await this.pickerController.create({
      columns: this.getPickerColumns(3, [this.hours, this.minutes, this.seconds]),
      buttons: [
        {
          text: 'Aceptar',
          handler: (value) => {
            this.newTimer(value[0].text, value[1].text, value[2].text);
            this.router.navigate(['/tabs/tab1']);
            picker.dismiss();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    
    await picker.present();
  }

  public dismiss(counter: Counter) {
    this.audio.pause();
    this.audio.currentTime = 0;
    return this.counterList.splice(this.counterList.findIndex(c => c === counter), 1);
  }

  private getPickerColumns(numColumns, numOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: i,
        options: this.getColumnOptions(numOptions[i])
      });
    }

    return columns;
  }

  private getColumnOptions(numOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: i.toLocaleString(undefined, {minimumIntegerDigits: 2}),
        value: i
      })
    }

    return options;
  }
}
