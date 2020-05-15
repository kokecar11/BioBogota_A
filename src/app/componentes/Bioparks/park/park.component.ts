import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ParksService } from 'src/app/services/parks.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss'],
})
export class ParkComponent implements OnInit {
  uidss : string
  title : string;
  img : string;
  lat : number;
  lng : number;
  type : string;
  desc: string;

  constructor(private modal: ModalController,
    private park : ParksService,
    public alert: AlertController,
    private afAuth : AngularFireAuth,
    private route : Router) { }

  ngOnInit() {}


  OnSavePark(uid : string){
    this.park.saveParks(this.title, this.img, this.lat, this.lng, this.type, this.desc,uid).then( res => {
      this.showAlert("Publicación Completa","El BioSitio "+ this.title+" fue publicado correctamente!");
      this.route.navigate(['folder/'+this.type]);
      this.back()
    }).catch(err => this.showAlert("Error!","No se puede Publicar"));
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



}
