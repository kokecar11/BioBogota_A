import { Injectable } from '@angular/core';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})

//Servicio de la Camara
export class CameraService {

  constructor( public base64: Base64,
    public camera: Camera,
    public crop : Crop) { }


//Activa la Camara del Celular para poder tomar una foto
  async Camera (){
    let options : CameraOptions ={
      sourceType : this.camera.PictureSourceType.CAMERA,
      encodingType : this.camera.EncodingType.JPEG,
      mediaType : this.camera.MediaType.PICTURE,
      destinationType : this.camera.DestinationType.FILE_URI
    };
    return  options;
  }

  //Entra en la galeria del Celular para poder escoger una foto.

  async Gallery (){

    let options : CameraOptions ={
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType : this.camera.EncodingType.JPEG,
      mediaType : this.camera.MediaType.PICTURE,
      destinationType : this.camera.DestinationType.FILE_URI
    };
    return options;

  }

//Recibe la opcion que haya escogido el usuario para poder asignar la foto en el preview y almacenarla en el Storage
 async Options(options : CameraOptions){
  return this.camera.getPicture(options).then(filePath =>{
    return this.crop.crop(filePath).then((croppedPath) =>{
     return this.base64.encodeFile(croppedPath).then(base64Data => {

        let temp = base64Data.substring(34);
        const croppedImage = 'data:image/jpeg;base64,' + temp;
        return croppedImage;  
      })
    })
  })
 }
}