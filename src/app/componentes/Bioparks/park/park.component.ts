import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ActionSheetController, ToastController } from '@ionic/angular';
import { ParksService } from 'src/app/services/parks.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from 'src/app/services/users.service';
import { map, finalize } from "rxjs/operators";
import { userInterface } from 'src/app/models/users';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss'],
})
export class ParkComponent implements OnInit {
  title : string;
  imgUrl : Observable<string>;
  img : string;
  lat : number;
  lng : number;
  type : string;
  desc: string;
  name_img = Math.random().toString(36).substring(2);

  croppedImage : string;
  percent;
  isUploadStart = false;
  Progress = false;
  message : string;
  image : string;

  public user : userInterface;

  constructor(private modal: ModalController,
    private parkService : ParksService,
    public alert: AlertController,
    private afAuth : AngularFireAuth,
    private route : Router,
    private fireDB : AngularFirestore,
    private userService : UsersService,
    private geolocation : Geolocation,
    public afStorage : AngularFireStorage,
    public actionSheetController : ActionSheetController,
    private toastController : ToastController,
    private cameraService : CameraService,

    ) { }

  ngOnInit() {}


  OnSavePark(uid : string){
    this.userService.getOnceUser(uid).subscribe(users =>{
      this.user = users;
      this.parkService.saveParks(this.title, this.img, this.lat, this.lng, this.type, this.desc,uid,this.user.name, this.name_img).then( res => {
        this.showAlert("Publicación Completa","El BioSitio "+ this.title+" fue publicado correctamente!");
        this.route.navigate(['folder/'+this.type]);
        this.back()
      }).catch(err => this.showAlert("Error!","No se puede Publicar"));
    });

  }

  back(){
    this.modal.dismiss();
  }
  
  async showAlert(header:string , message:string){
    const alert = await this.alert.create({
      header,
      message,
      buttons:["Ok"]
    });

    await alert.present();
}

async presentToast(message : string ) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000
  });
  toast.present();
}

 async geoloca(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude
    }).catch(err => {this.showAlert("Error!","No se pudo ubicar el BioSitio"), this.deleteIMG()});
    this.presentToast("Ubicación Obtenida!");
    return this.lat,this.lng;
  }

  async OnChooseImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Imagenes',
      buttons: [{
        text: 'Galeria',
        role: 'destructive',
        icon: 'images-outline',
        handler: () => {
          this.OnGallery()
        }
      },{
        text: 'Tomar Foto',
        icon: 'camera',
        role: 'update',
        handler: () => {
          this.OnCamera()
        }
      },
       {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  OnCamera(){
    this.cameraService.Camera().then(resp =>{
      const optionCamera = resp;
      this.cameraService.Options(optionCamera).then(img =>{
        this.croppedImage = img.toString();
        const imagen = this.croppedImage;
        this.preUploadIMG(imagen);
      });
    });

    

  }

  OnGallery(){
    this.cameraService.Gallery().then(resp =>{
       const optionGallery = resp;
       this.cameraService.Options(optionGallery).then(img =>{
        this.croppedImage =  img;
        const imagen = this.croppedImage;
        this.preUploadIMG(imagen);
      });
    });

    
         
  }

  preUploadIMG(imagen : string){
    
    const ref = this.afStorage.ref(`images/${this.name_img}`);
    const task =  ref.putString(imagen,"data_url");
    this.percent = task.percentageChanges();
    this.isUploadStart = true;
    this.Progress = true;
    task.snapshotChanges().pipe(finalize(()=> this.imgUrl = ref.getDownloadURL())).subscribe();
    setTimeout(() =>{
      document.getElementById("image").setAttribute("src",imagen);
      this.Progress = false;
    }, 250);
    this.presentToast("Imagen preparada!");
  }

  deleteIMG(){

    const ref = this.afStorage.ref(`images/${this.name_img}`);
    ref.delete();
  
  }

  OnCancel(){

    this.presentToast("Publicación Cancelada!");
    this.deleteIMG();
    this.back();
    
  }

}
