import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { ObjectService } from '../services/object.service';
import { ParksService} from '../services/parks.service';
import { map } from "rxjs/operators";
import { ModalController, ActionSheetController } from '@ionic/angular';
import { FandfComponent } from "../componentes/fandf/fandf.component";
import { FaunaComponent } from '../componentes/fauna/fauna.component';
import { ParkComponent } from '../componentes/Bioparks/park/park.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReactionsService } from '../services/reactions.service';
import { UsersService } from '../services/users.service';
import { userInterface } from '../models/users';



@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  public parks: any = [];
  position: {lat: number,lng: number};
  public reactions : number;
  public AuthUser : any;
  liked = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    public route: Router,
    private afAuth : AngularFireAuth,
    private objectService : ObjectService,
    public parkService : ParksService,
    private modal : ModalController,
    public actionSheetController: ActionSheetController,
    private reactionService : ReactionsService,
    private userService : UsersService,
    ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.parkService.getParks().subscribe(parkss => {
      this.parks = parkss;
    });

    this.afAuth.user.subscribe(user =>{
      this.AuthUser = user;
    })

  }

  locationPark(lat2:number ,lng2:number){
    this.position = {lat: lat2, lng:lng2};
    this.objectService.sendObjectSource(this.position);
    this.route.navigate(['/park']);
    
  }

  OnFauna (park){
    this.modal.create({
      component: FaunaComponent,
      componentProps : {
        title : park.title,
        idPark : park.id,
        type_f : "Fauna"
      }
    }).then((modal) => modal.present())
  }

  OnFlora (park){
    this.modal.create({
      component: FaunaComponent,
      componentProps : {
        title : park.title,
        idPark : park.id,
        type_f : "Flora"
      }
    }).then((modal) => modal.present())

  }
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

  OnCreatePark(){
    this.modal.create({
      component: ParkComponent,
    }).then((modal) => modal.present())

  }

  OnCreateFauna(idPark : string){
    this.modal.create({
      component: FandfComponent,
      componentProps : {
        id_Park : idPark
      }
    }).then((modal) => modal.present())

  }

  async presentActionSheet(idPark : string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      buttons: [{
        text: 'Agregar un animal o planta al Biositio',
        role: 'destructive',
        icon: 'add',
        handler: () => {
          this.OnCreateFauna(idPark)          
        }
      },
       {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
           actionSheet.dismiss();
        }
      }]
    });
    await actionSheet.present();
  }



}
