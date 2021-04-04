import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import Counter from '../models/Counter';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  hours: number[] = Array<number>(24).fill(null);
  minutes: number[] = Array<number>(60).fill(null);
  seconds: number[] = Array<number>(60).fill(null);
  counterList: Counter[] = [];
  counterListIndex = 0;

  hour: string = '00';
  minute: string = '00';
  second: string = '00';

  constructor(private timerService: TimerService, 
              private toastController: ToastController,
              private alertController: AlertController,
              private router: Router) {}

  ngOnInit(): void {
    for (let i = 0; i < this.hours.length; i++) {
      this.hours[i] = i;
    }
    for (let i = 0; i < this.minutes.length; i++) {
      this.minutes[i] = i;
      this.seconds[i] = i;
    }
  }

  hourChangeHandler(e) {
    this.hour = e.target.value;
  }

  minuteChangeHandler(e) {
    this.minute = e.target.value;
  }

  secondChangeHandler(e) {
    this.second = e.target.value;
  }

  removePreset(preset) {
    this.timerService.removePreset(preset);
  }

  addCounter(hours, minutes, seconds, title?) {
    if (this.timerService.newTimer(hours, minutes, seconds, title)) {
      this.hour = '00';
      this.minute = '00';
      this.second = '00';
      this.router.navigate(['/tabs/tab1']);
    } else {
      this.toastController.create({
        message: '¡Seleccione el tiempo de su temporizador!',
        duration: 5000,
        mode: 'ios',
        color: 'dark',
        position: 'top'
      }).then(toast => toast.present());
    }
  }

  openSaveAlert() {
    const hours = parseInt(this.hour);
    const minutes = parseInt(this.minute);
    const seconds = parseInt(this.second);

    if (hours || minutes || seconds) {
      this.alertController.create({
        animated: true,
        buttons: [
          {
            text: 'OK',
            handler: (value) => {
              if (value)
                this.timerService.newPreset(value.title || `${this.hour}:${this.minute}:${this.second}`, hours, minutes, seconds)
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
    } else {
      this.toastController.create({
        message: '¡Seleccione el tiempo de su temporizador!',
        duration: 5000,
        mode: 'ios',
        color: 'dark',
        position: 'top'
      }).then(toast => toast.present());
    }
  }
}
