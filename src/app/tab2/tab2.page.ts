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

  addCounter(hour: string, minute: string, second: string) {
    if (this.timerService.newTimer(hour, minute, second)) {
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
    if (parseInt(this.hour) || parseInt(this.minute) || parseInt(this.second)) {
      this.alertController.create({
        animated: true,
        buttons: ['OK', 'Cancelar'],
        header: 'Guardar temporizador',
        subHeader: '(no implementado)',
        inputs: [
          {
            name: 'Titulo',
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
