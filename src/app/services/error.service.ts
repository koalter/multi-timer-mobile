import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private alertController: AlertController,
              private toastController: ToastController) { }

  createErrorAlert(errorMsg: string) {
    this.alertController.create({
      message: errorMsg,
      backdropDismiss: false
    }).then(alert => alert.present());
  }

  createErrorToast(errorMsg: string) {
    this.toastController.create({
      message: errorMsg,
      duration: 5000,
      mode: 'ios',
      color: 'dark',
      position: 'top'
    }).then(toast => toast.present());
  }
}
