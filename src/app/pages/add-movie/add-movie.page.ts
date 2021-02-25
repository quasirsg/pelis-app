import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {
  imageMovie: any;
  fileToUpload: File = null;
  //Reactive form validators
  public errorMessages = {
    name: [
      { type: 'required', message: 'Campo obligatorio' },
      {
        type: 'maxlength',
        message: 'El nombre no puede tener más de 50 caracteres',
      },
    ],
    description: [
      { type: 'required', message: 'Campo obligatorio' },
      {
        type: 'maxlength',
        message: 'Por favor ingrese menos de 115 caracteres',
      },
    ],
    image: [
      { type: 'required', message: 'Campo obligatorio' },
      {
        type: 'extension',
        message: 'Solo puede subir imagenes',
      },
    ],
  };
  movieForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(115)]],
    image: [
      '',
      [
        Validators.required,
        RxwebValidators.extension({ extensions: ['jpeg', 'gif', 'jpg'] }),
      ],
    ],
  });
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private movieService: MovieService,
  ) {}

  ngOnInit() {}

  //Getters

  // AddMovie
  get name() {
    return this.movieForm.get('name');
  }
  get description() {
    return this.movieForm.get('description');
  }

  get image() {
    return this.movieForm.get('image');
  }

  addMovie() {
    const { name, description } = this.movieForm.value;
    this.movieService.addMovie(name, description, this.fileToUpload);
    this.modalCtrl.dismiss();
    this.movieForm.reset();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }
}
