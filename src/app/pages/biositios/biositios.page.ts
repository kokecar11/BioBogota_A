import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ParksService } from 'src/app/services/parks.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { parksInterface } from 'src/app/models/parks';
import { ParkComponent } from '../../componentes/Bioparks/park/park.component';
import { ReactionsService } from 'src/app/services/reactions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-biositios',
  templateUrl: './biositios.page.html',
  styleUrls: ['./biositios.page.scss'],
})
//Pagina de MisBioSitios.

export class BiositiosPage implements OnInit {
  liked = true;
  public mypark: any = [];
  park : parksInterface;
  constructor(private afAuth : AngularFireAuth,
    public route: Router,
    public parkService : ParksService,
    public actionSheetController: ActionSheetController,
    private afStorage : AngularFireStorage,
    private modal: ModalController,
    private reactionService : ReactionsService,
    private userService : UsersService,) { }

  ngOnInit() {

    this.parkService.getParks().subscribe(myparkss => {
      this.mypark = myparkss;      
    });
  }

  //Crea un ActionSheet de Ionic
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
          this.OnUpdatePark(idPark)
          
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
//Llama al metodo deletePark y Elimina al parque.
  OnDeletePark(idPark : string,name_img : string ){
    this.parkService.deletePark(idPark);
    const ref = this.afStorage.ref(`images/${name_img}`);
    ref.delete();
  }

//Llama al servicio de los parques ParkService, obtiene los datos del parque especifico. Y llama el metodo OnCreatePark, para Crear un modal
  OnUpdatePark(idPark : string){
    this.parkService.getPark(idPark).subscribe(park =>{

      this.park = park
      this.modal.create({ //Crea un modal con el componente ParkComponent e inserta los datos
        component: ParkComponent,
        componentProps : {
          id_Park : park,
          IsUpdate : true
        }
      }).then((modal) => modal.present())
        
    });

  }

  //Llama al servicio de Reacciones ReacitonsService donde Le puede dar Like o disLike a la publicacion

  OnLike(park, isLike: boolean){
    
    
    if(isLike ){
      this.afAuth.user.subscribe(res => {
        this.userService.getOnceUser(res.uid).subscribe(users =>{
           users;
           this.liked = false;
           this.reactionService.addLike2(park.id, users.uid)
        });
      }); 
      
    }else{
      this.afAuth.user.subscribe(res => {
        this.userService.getOnceUser(res.uid).subscribe(users =>{
           users;
           this.liked = true;
            this.reactionService.deleteLike(park.id, users.uid)
        });
      }); 
      
    }

  }

}
