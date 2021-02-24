import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddMoviePage } from '../add-movie/add-movie.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddMoviePage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
