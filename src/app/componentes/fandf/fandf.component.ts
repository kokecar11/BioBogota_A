import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ActionSheetController, ToastController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from 'src/app/services/users.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { userInterface } from 'src/app/models/users';
import { FandFService } from 'src/app/services/fand-f.service';
import { Router } from '@angular/router';
import { CameraService } from 'src/app/services/camera.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-fandf',
  templateUrl: './fandf.component.html',
  styleUrls: ['./fandf.component.scss'],
})
export class FandfComponent implements OnInit {

  imgUrl : Observable<string>;
  name : string 
  img : string;
  lat : number;
  lng : number;
  type_f : string;
  desc: string;
  name_img = Math.random().toString(36).substring(2);

  public user : userInterface;

  croppedImage : string;
  percent;
  isUploadStart = false;
  Progress = false;
  message : string;
  image : string;

  constructor(private navparams : NavParams,
    private route : Router,
    private modal : ModalController,
    private afAuth : AngularFireAuth,
    public afStorage : AngularFireStorage,
    private userService : UsersService,
    private actionSheetController : ActionSheetController,
    private toastController : ToastController,
    private alert: AlertController,
    private geolocation : Geolocation,
    private fandfService : FandFService,
    private cameraService : CameraService,) { }
  id_Park : string;
  ngOnInit() {
    this.id_Park = this.navparams.get("id_Park");
  
  }

  OnSaveFandF(uid : string){
    this.userService.getOnceUser(uid).subscribe(users =>{
      this.user = users;
      this.fandfService.saveFandF(this.name,this.img,this.type_f,this.desc,this.lat,this.lng,this.id_Park,uid,this.user.name,this.name_img).then(res =>{
        this.showAlert("Publicación Completa",this.name+" fue publicado correctamente!");
        this.route.navigate(['folder/']);
        this.back()
      })
    });

  }

  back(){
    this.modal.dismiss();
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
    await toast.present();
  }

  async geoloca(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude
    }).catch(err => {this.showAlert("Error!","No se pudo ubicar"), this.deleteIMG()});
    this.presentToast("Ubicación Obtenida!");
    return this.lat,this.lng;
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
