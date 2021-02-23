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
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return user;
    } catch (error) {
      console.log(error);
      
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

  async resetPassword(email): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
    return;
  }

  //Relacionado con register
  async register(email: string, password: string, name: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.changeUsername(name);
      await this.sendVerificationEmail();

      return user;
    } catch (error) {
      this.uiService.alertErrors(error.code);
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
