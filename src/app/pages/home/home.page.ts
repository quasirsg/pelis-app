import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddMovieComponent } from '../../components/add-movie/add-movie.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddMovieComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
