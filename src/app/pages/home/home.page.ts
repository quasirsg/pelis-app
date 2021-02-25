import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddMoviePage } from '../add-movie/add-movie.page';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  movies: Movie[];
  movieImage: any;
  search: boolean = false;
  name: string = '';
  user: any;
  constructor(
    public modalController: ModalController,
    private movieService: MovieService,
    private authSvc: AuthService
  ) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddMoviePage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies.reverse();
    });
    this.authSvc.user$.subscribe((user) => {
      if (user) {
        this.user = user.uid;
      }
    });
  }
  
  onClick() {
    this.search = true;
  }
  onSearchChange(event) {
    this.name = event.detail.value;
  }
  onSearchCancel() {
    this.search = false;
    this.name = '';
  }
}
