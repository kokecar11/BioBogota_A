import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams, ActionSheetController } from "@ionic/angular";
import { FandFService } from 'src/app/services/fand-f.service';
import { ObjectService } from 'src/app/services/object.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ReactionsService } from 'src/app/services/reactions.service';
import { AngularFireAuth } from '@angular/fire/auth';

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
    private actionSheetController:ActionSheetController  ) {}

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

  async OnOptionsUser(Parkid : string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      buttons: [{
        text: 'Editar',
        role: 'update',
        icon: 'pencil',
        handler: () => {
        
        }
      },{
        text: 'Eliminar',
        icon: 'trash',
        role: 'destructive',
        handler: () => {
          this.OnDeleteFanF(Parkid)
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

  OnDeleteFanF(Parkid : string){
    this.fandfService.deleteFandF(this.idPark,Parkid, this.type_f);

  }
}
