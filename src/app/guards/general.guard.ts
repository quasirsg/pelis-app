import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GeneralGuard implements CanLoad {

    constructor( private authSvc: AuthService,private navCtrl:NavController ) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean  {

    return this.authSvc.user$.pipe(
      take(1),
      map((user)=>{
        if (user) {
          this.navCtrl.navigateRoot('/home');
          return false
        }else{
          return true;
        }
      })
    );
  }
}
