import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [MovieComponent],
  exports: [MovieComponent],
  imports: [CommonModule],
})
export class ComponentsModule {}
