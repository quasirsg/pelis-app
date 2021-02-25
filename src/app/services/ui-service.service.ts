import { Injectable } from '@angular/core';
import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class UiServiceService {
  public loading: HTMLIonLoadingElement;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  async presentToast(message: string, color) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      color,
      duration: 2000,
    });
    toast.present();
  }

  async alertErrors(type: string) {
    switch (type) {
      case 'auth/wrong-password':
        this.presentToast(
          'La contraseña introducida no es correcta.',
          'danger'
        );
        break;
      case 'auth/email-already-in-use':
        this.presentToast('El email ya esta en uso.', 'danger');
        break;
      case 'auth/user-not-found':
        this.presentToast('Email Inexistente', 'danger');
        break;
      default:
        this.presentToast(
          'Error del servidor, inténtelo más tarder.',
          'danger'
        );
        break;
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      translucent: true,
      mode: 'ios',
      cssClass: 'loading',
    });
    await this.loading.present();
  }

  confirmResetPassword = async (cb: any) => {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Restablecer password!',
      message:
        'Al presionar <strong>confirmar</strong> se le enviara un mail (verifique en spam) para restablecer su contraseña!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Okay',
          handler: () => {
            cb();
          },
        },
      ],
    });

    await alert.present();
  };
}
