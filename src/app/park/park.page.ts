import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { ObjectService } from '../services/object.service';
declare var google;


interface marker{
    lat: number,
    lng: number,
};

@Component({
  selector: 'app-park',
  templateUrl: './park.page.html',
  styleUrls: ['./park.page.scss'],
})
export class ParkPage implements OnInit {

  map = null;
  public marker:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private objectService: ObjectService
) { }

  ngOnInit() {
    this.objectService.$getObjectSource.subscribe(data => {
      console.log(data)
      this.marker = data;
    }).unsubscribe(); 

    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: 4.658383846282959, lng: -74.09394073486328};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.addMarker();
      mapEle.classList.add('show-map');
    });
  }

  addMarker() {
    return new google.maps.Marker({
      position: this.marker,
      map: this.map,
      title: 'Punto'
    });
  }

 /* renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }*/

  

}
