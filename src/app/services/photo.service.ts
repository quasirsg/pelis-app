import { Injectable } from '@angular/core';

import { Camera } from '@ionic-native/camera/ngx';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { UiServiceService } from './ui-service.service';
@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private image = new BehaviorSubject<string>('');
  imageCast = this.image.asObservable();

  constructor(
    private camera: Camera,
    private storage: Storage,
    private uiService: UiServiceService
  ) {}

  async loadSaved() {
    this.storage.get('photo').then((photo) => {
      this.image.next(photo);
    });
  }

  takePicture() {
    this.camera
      .getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: false,
        encodingType: this.camera.EncodingType.JPEG,
        targetHeight: 1024,
        targetWidth: 1024,
        correctOrientation: true,
        saveToPhotoAlbum: true,
      })
      .then((resultado) => {
        this.image.next('data:image/jpeg;base64,' + resultado);
        this.storage.set('photo', 'data:image/jpeg;base64,' + resultado);
      })
      .catch((error) => {
        this.uiService.presentToast('Error al cargar la imagen', 'danger');
      });
  }
}
