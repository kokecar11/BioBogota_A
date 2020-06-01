import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams, ActionSheetController } from "@ionic/angular";
import { FandFService } from 'src/app/services/fand-f.service';
import { ObjectService } from 'src/app/services/object.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ReactionsService } from 'src/app/services/reactions.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FandfComponent } from '../fandf/fandf.component';

@Component({
  selector: "app-fauna",
  templateUrl: "./fauna.component.html",
  styleUrls: ["./fauna.component.scss"],
})
export class FaunaComponent implements OnInit {
  constructor(private navparams: NavParams,
    private modal: ModalController, 
    private fandfService : FandFService,
    private objectService : ObjectService, 
    public route: Router,
    private reactionService : ReactionsService,
    private userService : UsersService,
    private afAuth : AngularFireAuth,
    private actionSheetController:ActionSheetController,
    private modal2: ModalController,  ) {}

  title: string;
  idPark: string;
  type_f : string;
  public faunas: any = [];
  liked = true;

  user2 : any;

  position: {lat: number,lng: number};

  ngOnInit() {
    this.title = this.navparams.get("title");
    this.idPark = this.navparams.get("idPark");
    this.type_f = this.navparams.get("type_f");
    this.fandfService.getAllFandF(this.idPark,this.type_f).subscribe(faunass => {

      this.faunas = faunass;
    });
  }

  async OnOptionsUser(Id_F : string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      buttons: [{
        text: 'Eliminar',
        icon: 'trash',
        role: 'destructive',
        handler: () => {
          this.OnDeleteFanF(Id_F)
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

  backs() {
    this.modal.dismiss();
  }

  locationFauna(lat2:number ,lng2:number){
    this.position = {lat: lat2, lng:lng2};
    this.objectService.sendObjectSource(this.position);
    this.backs()
    this.route.navigate(['/park']);
    
  }
  OnLike(fauna, isLike: boolean){
    
    if(isLike ){
      this.afAuth.user.subscribe(res => {
        this.userService.getOnceUser(res.uid).subscribe(users =>{
           users;
           this.liked = false;
           this.reactionService.addLikeF(this.idPark,fauna.id, fauna.type_f, users.uid)
        });
      }); 
      
    }else{
      this.afAuth.user.subscribe(res => {
        this.userService.getOnceUser(res.uid).subscribe(users =>{
           users;
           this.liked = true;
            this.reactionService.deleteLikeF(this.idPark,fauna.id, fauna.type_f, users.uid)
        });
      }); 
      
    }

  }

  OnUpdateFanF(Id_F : string){ 

    this.fandfService.getOneFandF(this.idPark,Id_F,this.type_f).subscribe(F =>{

      this.modal2.create({ //Crea un modal con el componente ParkComponent e inserta los datos
        component: FandfComponent,
        componentProps : {
          id_F : F,
          IsUpdate : true,
          Type : this.type_f
        }
      }).then((modal2) => modal2.present())
        
    });

  }


  OnDeleteFanF(Id_F : string){
    this.fandfService.deleteFandF(this.idPark, Id_F, this.type_f);

  }
}
