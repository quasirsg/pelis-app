import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

    constructor( private authSvc: AuthService,private navCtrl:NavController ) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean  {

    return this.authSvc.user$.pipe(
      take(1),
      map((user)=>{
        if (user) {
          return true
        }else{
          this.navCtrl.navigateRoot('/login');
          return false;
        }
      })
    );
  }
}
