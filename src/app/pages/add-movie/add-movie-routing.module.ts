import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMoviePage } from './add-movie.page';

const routes: Routes = [
  {
    path: '',
    component: AddMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMoviePageRoutingModule {}
