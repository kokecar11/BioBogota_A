import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { ObjectService } from '../services/object.service';
import { ParksService, parks} from '../services/parks.service';
import { map } from "rxjs/operators";
import { ModalController } from '@ionic/angular';
import { FloraComponent } from '../componentes/flora/flora.component';
import { FaunaComponent } from '../componentes/fauna/fauna.component';
import { ParkComponent } from '../componentes/Bioparks/park/park.component';



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
    private objectService : ObjectService,
    public parkService : ParksService,
    private modal : ModalController,
    ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.parkService.getParks().subscribe(parkss => {

      this.parks = parkss;
      
    })
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
    this.modal.create({
      component: FaunaComponent,
      componentProps : {
        title : park.title,
        nameF : park.fauna.name
      }
    }).then((modal) => modal.present())

  }

  OnFlora (park){
    this.modal.create({
      component: FloraComponent,
      componentProps : {
        title : park.title,
        nameF : park.flora.name
      }
    }).then((modal) => modal.present())

  }

  OnCreatePark(){
    this.modal.create({
      component: ParkComponent,
    }).then((modal) => modal.present())

  }


}
