import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;
  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true,
    },
    {
      img: 'av-2.png',
      seleccionado: false,
    },
    {
      img: 'av-3.png',
      seleccionado: false,
    },
    {
      img: 'av-4.png',
      seleccionado: false,
    },
    {
      img: 'av-5.png',
      seleccionado: false,
    },
    {
      img: 'av-6.png',
      seleccionado: false,
    },
    {
      img: 'av-7.png',
      seleccionado: false,
    },
    {
      img: 'av-8.png',
      seleccionado: false,
    },
  ];

  avatarSlide = {
    sliedesPerView: 3.5,
  };
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

  constructor(
    private authSvc: AuthService,
    private navCtrl: NavController,
    private uiService: UiServiceService,
    private formBuilder: FormBuilder
  ) {}

  //Getters
  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  ngOnInit() {}

  // login(fLogin: NgForm) {
  //   console.log(fLogin.valid);
  // }
  async register() {
    const { email, password, name } = this.registrationForm.value;
    const user = await this.authSvc.register(email, password, name);
    if (user) {
      console.log(user);
      // Todo: verificado
      this.registrationForm.reset();
      await this.mostrarLogin();
      this.uiService.presentToast(
        'Verifique su correo electronico!! (Verifique en spam)',
        'success'
      );
    }
  }

  seleccionarAvatar(avatar) {
    this.avatars.forEach((av) => (av.seleccionado = false));
    avatar.seleccionado = true;
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
}
