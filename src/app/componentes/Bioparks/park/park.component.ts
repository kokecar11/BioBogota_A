import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ActionSheetController, ToastController, NavParams } from '@ionic/angular';
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
import { Observable, empty } from 'rxjs';
import { CameraService } from 'src/app/services/camera.service';
import { parksInterface } from 'src/app/models/parks';

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
  id_Park : parksInterface ;
  name_img : string;

  croppedImage : string;
  percent;
  isUploadStart = false;
  Progress = false;
  message : string;
  image : string;
  IsUpdate : boolean;
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
    private navparams : NavParams,

    ) { }

  ngOnInit() {
    this.id_Park = this.navparams.get("id_Park");
    this.IsUpdate = this.navparams.get("IsUpdate");
    if(this.IsUpdate){
     this.OnGetPark();
    }
    
  }
//Obtiene 1 Parque que se va actualizar.
  OnGetPark(){
  
      this.isUploadStart = true;
      this.title = this.id_Park.title
      //this.img = this.id_Park.img
      this.desc = this.id_Park.desc
      this.type = this.id_Park.type
      this.lat = this.id_Park.position.lat
      this.lng = this.id_Park.position.lng

      setTimeout(() =>{
      document.getElementById("image").setAttribute("src",this.id_Park.img);
      this.Progress = false;
      }, 250);
          
  }


  OnSavePark(){
    this.afAuth.user.subscribe(res =>{
    this.userService.getOnceUser(res.uid).subscribe(users =>{
      this.user = users;
      this.parkService.saveParks(this.title, this.img, this.lat, this.lng, this.type, this.desc,res.uid,this.user.name, this.name_img).then( res => {
        this.showAlert("Publicación Completa","El BioSitio "+ this.title+" fue publicado correctamente!");
        this.route.navigate(['folder/'+this.type]);
        this.back()
      }).catch(err => this.showAlert("Error!","No se puede Publicar"+err));
    });
  })

  }

  OnUpdatePark(){
    this.parkService.updatePark(this.id_Park.id,this.title, this.img, this.lat, this.lng, this.type, this.desc,this.name_img).then(res =>{
      this.showAlert("Actualización Completa","El BioSitio "+ this.title+" fue actualizado correctamente!");
        this.route.navigate(['folder/'+this.type]);
        this.back()
    }).catch(err => this.showAlert("Error!", "No se puede Actualizar el Biositio"))
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
    setTimeout(() =>{
      document.getElementById("image").setAttribute("src",this.img);
    }, 200);
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
          setTimeout(() =>{
            document.getElementById("image").setAttribute("src",this.img);
          }, 200);
        }
      },{
        text: 'Tomar Foto',
        icon: 'camera',
        role: 'update',
        handler: () => {
          this.OnCamera()
          setTimeout(() =>{
            document.getElementById("image").setAttribute("src",this.image);
          }, 200);
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
        setTimeout(() =>{
          document.getElementById("image").setAttribute("src",imagen);
        }, 200);
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
        setTimeout(() =>{
          document.getElementById("image").setAttribute("src",imagen);
        }, 200);
        this.preUploadIMG(imagen);
      });
    });

  }

  preUploadIMG(imagen : string){
    const nameimg = Math.random().toString(36).substring(2);
    this.name_img = nameimg;
    const ref = this.afStorage.ref(`images/${nameimg}`);
    console.log(ref)
    const task =  ref.putString(imagen,"data_url");
    this.percent = task.percentageChanges();
    this.isUploadStart = true;
    this.Progress = true;
    this.image = imagen
    task.snapshotChanges().pipe(finalize(()=> this.imgUrl = ref.getDownloadURL())).subscribe();
    setTimeout(() =>{
      document.getElementById("image").setAttribute("src",imagen);
      this.Progress = false;
    }, 200);
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
