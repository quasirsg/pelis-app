import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddMoviePage } from '../add-movie/add-movie.page';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  movies: Movie[];
  movieImage: any;
  
  constructor(
    public modalController: ModalController,
    private movieService: MovieService,
    private uiService: UiServiceService
  ) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddMoviePage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  ngOnInit() {
    this.loading();
  }
  async loading() {
    await this.movieService.getMovies().subscribe((movies) => {
      if (movies.length !== 0) {
        this.uiService.presentLoading();
      }
      this.movies = movies;
    });
  }
}
