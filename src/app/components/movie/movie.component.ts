import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  url: string;
  rate: any;
  rateBd:any;
  @Input() name;
  @Input() description;
  @Input() photo;
  @Input() uid;
  constructor(
    private movieService: MovieService,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    //Observable

    this.movieService.getMovieImage(this.photo).then((url) => {
      url.subscribe((url) => {
        this.url = url;
        return url;
      });
    });
    setTimeout(() => {
      let uid = this.uid + this.photo;
      this.movieService.getRating(uid).then((rate) => {
        rate.subscribe((rate) => {
          this.rateBd = rate.record;
          console.log(rate, 'xd');

          return this.rate;
        });
      });
    }, 300);
  }

  onRateChange = (event) => {
    this.rate = event;
    let uid = this.uid + this.photo;
    this.movieService.addRating(this.rate, uid);
  };
}
