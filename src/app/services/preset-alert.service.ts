import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TimerService } from './dummy/timer.service';

@Injectable({
  providedIn: 'root'
})
export class PresetAlertService {

  constructor(private alertController: AlertController,
              private timerService: TimerService) { }

  createPresetAlert(hours: number, minutes: number, seconds: number) {
    return this.alertController.create({
      animated: true,
      buttons: [
        {
          text: 'OK',
          handler: (value) => {
            if (value)
              this.timerService.newPreset(value.title || `${hours.toLocaleString(null, { minimumIntegerDigits: 2 })}:${minutes.toLocaleString(null, { minimumIntegerDigits: 2 })}:${seconds.toLocaleString(null, { minimumIntegerDigits: 2 })}`, hours, minutes, seconds)
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }],
      header: 'Guardar temporizador',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Ingrese el titulo'
        }
      ]
    }).then(alert => alert.present());
  }
}
