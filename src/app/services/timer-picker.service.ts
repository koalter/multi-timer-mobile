import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { TimerService } from './dummy/timer.service';

@Injectable({
  providedIn: 'root'
})
export class TimerPickerService {

  hours: number = 24;
  minutes: number = 60;
  seconds: number = 60;

  constructor(private pickerController: PickerController,
              private router: Router,
              private timerService: TimerService) { }

  async createTimerPicker() {
    const picker = await this.pickerController.create({
      columns: this.getPickerColumns(3, [this.hours, this.minutes, this.seconds]),
      buttons: [
        {
          text: 'Aceptar',
          handler: (value) => {
            this.timerService.newTimer(value[0].text, value[1].text, value[2].text);
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
