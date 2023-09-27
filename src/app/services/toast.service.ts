import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(
    mensaje: string,
    tipo: 'success' | 'warning' | 'danger' | 'dark' = 'dark'
  ) {
    let icon = undefined;
    switch (tipo) {
      case 'success':
        icon = 'checkmark-circle';
        break;
      case 'warning':
        icon = 'information-circle';
        break;
      case 'danger':
        icon = 'close-circle';
        break;
    }

    const toast = await this.toastController.create({
      message: mensaje,
      position: 'top',
      color: tipo,
      duration: 5000,
      cssClass: 'custom-toast',
      icon: icon,
      layout: 'stacked',
    });

    await toast.present();
  }
}
