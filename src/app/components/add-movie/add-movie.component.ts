import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}
  salirSinArgumentos(){
    this.modalCtrl.dismiss();
  }
  salirConArgumentos(){
    this.modalCtrl.dismiss({
      nombre:'Felipe',
      pais:'España'
    });
  }

}
