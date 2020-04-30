import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { ObjectService } from '../services/object.service';
import { ParksService} from '../services/parks.service';

interface parks {
  title: string;
  img: string;
  type:string;
  position:{
    lat: number,
    lng: number,
  };
  fauna:{
    name:string,
    tipo:string,
    desc:string,

  };
  flora:{
    name:string,
    tipo:string,
    desc:string,
  };
  
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  public parks: any = [];
  position: {lat: number,lng: number};
  fauna1: {name:string, tipo:string, desc:string};
  parkF:{
    title: string, 
    fauna:{
      name: string,
      tipo: string,
      desc: string,
    } };

  constructor(
    private activatedRoute: ActivatedRoute,
    public route: Router,
    private objectService : ObjectService,
    public parkService : ParksService,
    ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.parkService.getParks().subscribe(parkss => {
      
      parkss.map(park => {
        const data : parks = park.payload.doc.data() as parks;
        this.parks.push(data);

      } )
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
  fauna(title: string, name:string, tipo:string, desc:string){

    this.parkF= {title: title, 
    fauna:{
      name: name,
      tipo: tipo,
      desc: desc,
    } };

    this.fauna1 = {name: name, tipo: tipo, desc:desc};
    this.objectService.sendObjectSource(this.parkF);
    this.route.navigate(['/fauna']);
  }


  flora(title: string, name:string, tipo:string, desc:string){

    this.parkF= {title: title, 
    fauna:{
      name: name,
      tipo: tipo,
      desc: desc,
    } };

    this.fauna1 = {name: name, tipo: tipo, desc:desc};
    this.objectService.sendObjectSource(this.parkF);
    this.route.navigate(['/flora']);
  }


}
