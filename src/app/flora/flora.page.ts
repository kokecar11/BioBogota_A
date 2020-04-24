import { Component, OnInit } from '@angular/core';
import { ObjectService } from '../services/object.service';

@Component({
  selector: 'app-flora',
  templateUrl: './flora.page.html',
  styleUrls: ['./flora.page.scss'],
})
export class FloraPage implements OnInit {

  constructor(private objectService: ObjectService,) { }

  public flora:any;

  ngOnInit() {
    this.objectService.$getObjectSource.subscribe(data => {
      this.flora = data;
    }).unsubscribe(); 
  }

}
