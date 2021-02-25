import { Component, Input, OnInit } from '@angular/core';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  url: string;
  @Input() name;
  @Input() description;
  @Input() photo;
  @Input() render;
  constructor(
    private movieService: MovieService,
    private uiService: UiServiceService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.movieService.getMovieImage(this.photo).then((url) => {
        url.subscribe((url) => {
          this.url = url;
          return url;
        });
      });
      this.uiService.loading.dismiss();
    }, 1500);
  }
}
