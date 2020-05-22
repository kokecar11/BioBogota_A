import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { FandFService } from 'src/app/services/fand-f.service';
import { ObjectService } from 'src/app/services/object.service';
import { Router } from '@angular/router';

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
    public route: Router,  ) {}

  title: string;
  idPark: string;
  type_f : string;
  public faunas: any = [];

  position: {lat: number,lng: number};

  ngOnInit() {
    this.title = this.navparams.get("title");
    this.idPark = this.navparams.get("idPark");
    this.type_f = this.navparams.get("type_f");
    this.fandfService.getAllFandF(this.idPark,this.type_f).subscribe(faunass => {

      this.faunas = faunass;
      console.log(faunass)
    });
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
}
