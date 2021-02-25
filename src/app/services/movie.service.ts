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
import { Rating } from '../interfaces/rating';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movieCollection: AngularFirestoreCollection<Movie>;
  movieImageCollection: AngularFirestoreCollection<string>;
  ratingCollection: AngularFirestoreCollection<string>;

  movies: Observable<Movie[]>;
  movieImage: Observable<string>;
  rating: Observable<any>;

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
  async getMovieImage(id) {
    this.movieImage = await this.afStorage.ref(`movies/${id}`).getDownloadURL();
    return this.movieImage;
  }
  async addRating(record:number,uid:string){
    this.afs.collection('ratings').doc(uid).set({
      record,
    }).then(()=>console.log(uid)).catch(console.log);
  }
  async getRating(uid) {
    this.rating = this.afs.collection('ratings/').doc(uid).valueChanges();
    return this.rating;
  }
  private uploadImage(file: any, fileName: any) {
    const ref = this.afStorage.ref('movies').child(fileName);
    return ref.put(file);
  }

  getMovies() {
    return this.movies;
  }

  getRecords(){
    return this.rating;
  }
}
