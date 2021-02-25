import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie/movie.component';
// Import ionic-rating module
import { IonicRatingModule } from 'ionic4-rating';
@NgModule({
  declarations: [MovieComponent],
  exports: [MovieComponent],
  imports: [CommonModule,IonicRatingModule],
})
export class ComponentsModule {}
