import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';
import { UiServiceService } from '../../services/ui-service.service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;
  image: any;
  imgUrl: any = 'assets/avatars/av-1.png';
  fabSlide: boolean = true;
  resetPass: boolean = false;
  //Reactive form validators
  public errorMessages = {
    name: [
      { type: 'required', message: 'Campo obligatorio' },
      {
        type: 'maxlength',
        message: 'El nombre no puede tener más de 50 caracteres',
      },
    ],
    email: [
      { type: 'required', message: 'Campo obligatorio' },
      { type: 'pattern', message: 'Por favor ingrese un email valido' },
    ],
    password: [
      { type: 'required', message: 'Campo obligatorio' },
      {
        type: 'pattern',
        message:
          'La contraseña debe tener al menos una minúscula, una mayúscula, un numero y un carácter especial',
      },
    ],
  };
  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ],
    ],
  });

  loginForm = this.formBuilder.group({
    emailP: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ],
    ],
    passwordP: ['', [Validators.required]],
  });

  constructor(
    private authSvc: AuthService,
    private navCtrl: NavController,
    private uiService: UiServiceService,
    private formBuilder: FormBuilder,
    private photoService: PhotoService
  ) {}

  ngOnInit() {
    this.slides.lockSwipes(true);
    //Observable
    this.photoService.imageCast.subscribe((data) => {
      this.image = data;
    });
    //Pedir storage de photo
    this.photoService.loadSaved();
  }
  //Getters

  //Register
  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  //Login
  get emailP() {
    return this.loginForm.get('emailP');
  }

  get passwordP() {
    return this.loginForm.get('passwordP');
  }
  //
  async login() {
    const { emailP, passwordP } = this.loginForm.value;
    const user = await this.authSvc.login(emailP, passwordP);
    if (user && user.emailVerified) {
      this.navCtrl.navigateRoot('/home');
    } else {
      this.resetPass = true;
    }
  }
  //
  resetPassword = () => {
    const { emailP } = this.loginForm.value;

    this.uiService.confirmResetPassword(() =>
      this.authSvc.resetPassword(emailP)
    );
  };
  //
  async register() {
    const { email, password, name } = this.registrationForm.value;
    const user = await this.authSvc.register(email, password, name);
    if (user) {
      this.registrationForm.reset();
      await this.mostrarLogin();
      this.uiService.presentToast(
        'Verifique su correo electronico!! (Verifique en spam)',
        'success'
      );
    }
  }
  // Sliders
  mostrarRegistro() {
    this.fabSlide = false;
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
    setTimeout(() => {
      this.fabSlide = true;
    }, 1200);
  }
  //Tomar foto y actualizar el observable
  addPhotoToGallery() {
    this.photoService.takePicture();
    this.photoService.loadSaved();
  }
}
