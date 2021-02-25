import { Injectable } from '@angular/core';
import { UiServiceService } from './ui-service.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import * as uuid from 'uuid';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movieCollection: AngularFirestoreCollection<Movie>;
  movieImageCollection: AngularFirestoreCollection<string>;

  movies: Observable<Movie[]>;
  movieImage: Observable<string>;

  constructor(
    private afs: AngularFirestore,
    private uiService: UiServiceService,
    private afStorage: AngularFireStorage
  ) {
    this.movies = this.afs.collection('movies').valueChanges();
  }

  async addMovie(name: string, description: string, file: File) {
    //Generar un UID para referenciar la foto
    const fileName = uuid.v4();
    //Set en la collection movies (firebase)
    this.uiService.presentLoading();

    await this.uploadImage(file, fileName);

    this.afs
      .collection('movies')
      .add({
        name,
        description,
        photo: fileName,
      })
      .then((docRef) => {
        this.uiService.loading.dismiss();
        this.uiService.presentToast('Pelicula creada con exito', 'success');
      })
      .catch((error) => {
        this.uiService.presentToast('Error al crear la pelicula', 'danger');
      });
  }

  private uploadImage(file: any, fileName: any) {
    const ref = this.afStorage.ref('artist').child(fileName);
    return ref.put(file);
  }
  async getMovieImage(id) {
    this.movieImage = await this.afStorage.ref(`artist/${id}`).getDownloadURL();
    return this.movieImage;
  }
  getMovies() {
    return this.movies;
  }
}
