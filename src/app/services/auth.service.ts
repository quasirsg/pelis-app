import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { UiServiceService } from './ui-service.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;
  public userr$;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private navCtrl: NavController,
    private uiService: UiServiceService
  ) {
    //Inicializar el observable buscando el usuario que se logeo en el estado del auth (fireAuth)
    this.user$ = afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }

        return of(null);
      })
    );
  }

  //Relacionado con login
  async login(email: string, password: string): Promise<User> {
    try {
      this.uiService.presentLoading();
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.uiService.loading.dismiss();
      return user;
    } catch (error) {
      console.log(error);
      this.uiService.loading.dismiss();

      this.uiService.alertErrors(error.code);
    }
    return;
  }
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      console.log('Error->', error);
    }
    return;
  }

  resetPassword = async (email): Promise<void> => {
    try {
      this.uiService.presentLoading();
      await this.afAuth.sendPasswordResetEmail(email);
      this.uiService.loading.dismiss();

      this.uiService.presentToast(
        'Contraseña restablecida!! (Verifique en spam)',
        'success'
      );
    } catch (error) {
      this.uiService.loading.dismiss();
      this.uiService.alertErrors(error.code);
    }
    return;
  };

  //Relacionado con register
  async register(email: string, password: string, name: string): Promise<User> {
    try {
      this.uiService.presentLoading();

      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.uiService.loading.dismiss();

      await this.changeUsername(name);
      await this.sendVerificationEmail();

      return user;
    } catch (error) {
      this.uiService.alertErrors(error.code);
      this.uiService.loading.dismiss();
    }
    return;
  }
  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error->', error);
    }
  }
  async changeUsername(name: string) {
    try {
      return (await this.afAuth.currentUser).updateProfile({
        displayName: name,
      });
    } catch (error) {
      console.log('Error->', error);
    }
  }
  //Validaciones
  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }
}
