import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(public toastController: ToastController) { }

  async presentToast(message:string,color) {
    const toast = await this.toastController.create({
      message,
      position:'top',
      color,
      duration: 2000
    });
    toast.present();
  }

  async alertErrors(type:string) {
    switch (type) {
      case "auth/wrong-password":
        this.presentToast("La contraseña introducida no es correcta.","danger");
        break;
      case "auth/email-already-in-use":
        this.presentToast("El email ya esta en uso.","danger");
        break;
      default:
        this.presentToast("Error del servidor, inténtelo más tarder.","danger");
        break;
    }
  }
}