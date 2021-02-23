import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {Camera} from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private image = new BehaviorSubject<string>('');
  imageCast = this.image.asObservable();
  constructor(private camera:Camera) { }

  addNewToGallery(){
    this.camera.getPicture({
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType:this.camera.MediaType.PICTURE,
      allowEdit:false,
      encodingType:this.camera.EncodingType.JPEG,
      targetHeight:1024,
      targetWidth:1024,
      correctOrientation:true,
      saveToPhotoAlbum:true
    }).then(resultado =>{
      this.image.next("data:image/jpeg;base64,"+resultado);
    }).catch(error =>{
      console.log(error);
    })
  }
  
}
