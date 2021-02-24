import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AddMoviePageRoutingModule } from './add-movie-routing.module';
import { AddMoviePage } from './add-movie.page';
import {  RxReactiveFormsModule } from "@rxweb/reactive-form-validators"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RxReactiveFormsModule,
    AddMoviePageRoutingModule,

  ],
  declarations: [AddMoviePage]
})
export class AddMoviePageModule {}
