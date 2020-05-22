import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ParksService } from 'src/app/services/parks.service';
import { ActionSheetController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-biositios',
  templateUrl: './biositios.page.html',
  styleUrls: ['./biositios.page.scss'],
})
export class BiositiosPage implements OnInit {

  public mypark: any = [];
  constructor(private afAuth : AngularFireAuth,
    public route: Router,
    public parkService : ParksService,
    public actionSheetController: ActionSheetController,
    private afStorage : AngularFireStorage) { }

  ngOnInit() {

    this.parkService.getParks().subscribe(myparkss => {

      this.mypark = myparkss;
      console.log(this.mypark)
      
    });
  }

  async presentActionSheet(idPark : string,name_img : string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          
          this.OnDeletePark(idPark, name_img)
        }
      },{
        text: 'Editar',
        icon: 'pencil',
        role: 'update',
        handler: () => {
          console.log('Editar');
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

  OnDeletePark(idPark : string,name_img : string ){
    this.parkService.deletePark(idPark);
    const ref = this.afStorage.ref(`images/${name_img}`);
    ref.delete();
  }

}
