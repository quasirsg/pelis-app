import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage{

  constructor(private authSvc: AuthService,private router:Router) { }

  async onResetPassword(email){
    try {
      await this.authSvc.resetPassword(email.value);
      this.router.navigate(['login']);
    } catch (error) {
        console.log('Error->',error);
    }
  }
}
