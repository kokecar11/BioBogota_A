import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { ObjectService } from '../services/object.service';

interface parks {
  title: string;
  img: string;
  type:string;
  position:{
    lat: number,
    lng: number,
  };
  
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  public parks: parks[];
  position: {lat: number,lng: number};

  constructor(
    private activatedRoute: ActivatedRoute,
    public route: Router,
    private objectService : ObjectService) {
    
      this.parks =[{
        title: 'Simon Bolivar',
        img: 'https://bogota.gov.co/sites/default/files/styles/1050px/public/field/image/simon-bolivar.jpg',
        type: 'BioSitios',
        position: {
          lat: 4.658430099,
          lng: -74.093772888,
        }
    
      },
      {
        title: 'Parque de los Novios',
        img: 'https://www.idrd.gov.co/sitio/idrd/sites/default/files/imagenes/PARQUE%20LOS%20NOVIOS%20CUMPLE%2040%20AN%cc%83OS.jpg',
        type: 'BioSitios',
        position: {
          lat: 4.655799866, 
          lng: -74.081657410,
        }
    
      }
      ,
      {
        title: 'Restaurante Tramonti',
        img: 'http://www.bogotatravelguide.com/Imagenes/restaurante-tramonti-2b.jpg',
        type: 'BioRestaurantes',
        position: {
          lat: 4.6695967,
          lng: -74.0388919
        }
    
      }
      ,
      {
        title: 'Quebrada la vieja',
        img: 'https://www.eltiempo.com/files/article_main/uploads/2018/04/30/5ae755baebaab.jpeg',
        type: 'BioSenderos',
        position: {
          lat: 4.6501338,
          lng: -74.050746,
        }

      }];

     }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  locationPark(lat2:number ,lng2:number){
    this.position = {lat: lat2, lng:lng2};
    this.objectService.sendObjectSource(this.position);
    this.route.navigate(['/park']);
    
  }
  camara(){
    this.route.navigate(['/camera']);
  }

}
