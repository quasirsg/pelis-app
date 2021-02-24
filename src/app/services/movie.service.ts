import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UiServiceService } from './ui-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(
    private afs: AngularFirestore,
    private uiService: UiServiceService,
    private afStorage: AngularFireStorage
  ) {}

  async addMovie(name: string, description: string, file: File) {
    const fileName = uuid.v4();

    await this.afs
      .collection('movies')
      .add({
        name,
        description,
        photo: fileName,
      })
      .then((docRef) => {
        this.uploadImage(file, fileName);
        this.uiService.presentToast('Pelicula creada con exito', 'success');
      })
      .catch((error) => {
        console.log(error);

        this.uiService.presentToast('Error al crear la pelicula', 'danger');
      });
  }

  private uploadImage(file: any, fileName: any) {
    const ref = this.afStorage.ref('artist').child(fileName);
    return ref.put(file);
  }
}
