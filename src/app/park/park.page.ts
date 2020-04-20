import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { ObjectService } from '../services/object.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-park',
  templateUrl: './park.page.html',
  styleUrls: ['./park.page.scss'],
})
export class ParkPage implements OnInit {

  map = null;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  origin = { lat: 4.6445625, lng: -74.0746365 };
  destination = { lat: 4.658430099, lng: -74.093772888 };

  public marker:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private objectService: ObjectService,
    ) { }


  ngOnInit() {
    this.objectService.$getObjectSource.subscribe(data => {
      this.marker = data;
    }).unsubscribe(); 

    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.marker,
      zoom: 14
    });
  
    this.directionsDisplay.setMap(this.map);
    //this.directionsDisplay.setPanel(indicatorsEle);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      
      mapEle.classList.add('show-map');
      this.addMarker();
      //this.calculateRoute();
    });
  }

  addMarker() {
    return new google.maps.Marker({
      position: this.marker,
      map: this.map,
      title: 'Punto'
    });
  }

  private calculateRoute(){
    this.directionsService.route({
      origin: this.origin,
      destination: this.marker,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

 /* renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }*/

  

}
