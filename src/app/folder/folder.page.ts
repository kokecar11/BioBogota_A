import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { ObjectService } from '../services/object.service';
import { ParksService} from '../services/parks.service';
import { map } from "rxjs/operators";
import { ModalController, ActionSheetController } from '@ionic/angular';
import { FloraComponent } from '../componentes/flora/flora.component';
import { FandfComponent } from "../componentes/fandf/fandf.component";
import { FaunaComponent } from '../componentes/fauna/fauna.component';
import { ParkComponent } from '../componentes/Bioparks/park/park.component';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  public parks: any = [];
  position: {lat: number,lng: number};

  constructor(
    private activatedRoute: ActivatedRoute,
    public route: Router,
    private afAuth : AngularFireAuth,
    private objectService : ObjectService,
    public parkService : ParksService,
    private modal : ModalController,
    public actionSheetController: ActionSheetController,
    ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.parkService.getParks().subscribe(parkss => {

      this.parks = parkss;
    });

  }

  locationPark(lat2:number ,lng2:number){
    this.position = {lat: lat2, lng:lng2};
    this.objectService.sendObjectSource(this.position);
    this.route.navigate(['/park']);
    
  }
  camara(){
    this.route.navigate(['/camera']);
  }

  OnFauna (park){
    console.log(park.fauna)
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
  OnLike (){
    console.log("Like a este biositio")
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

  OnCreateFlora(){
    
  }


  async presentActionSheet(idPark : string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      buttons: [{
        text: 'Agregar un Animal al BioSitio',
        role: 'destructive',
        icon: 'paw',
        handler: () => {
          this.OnCreateFauna(idPark)
          console.log('Agregar animal en el Biositio:', idPark );
          
        }
      },{
        text: 'Agregar una Planta al BioSitio',
        icon: 'rose',
        role: 'update',
        handler: () => {
          console.log('Agregar animal en el Biositio:', idPark);
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



}
