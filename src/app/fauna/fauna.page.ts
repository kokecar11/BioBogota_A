import { Component, OnInit } from '@angular/core';
import { ObjectService } from '../services/object.service';

@Component({
  selector: 'app-fauna',
  templateUrl: './fauna.page.html',
  styleUrls: ['./fauna.page.scss'],
})
export class FaunaPage implements OnInit {

  constructor(private objectService: ObjectService,) { }


  public fauna:any;
  
  ngOnInit() {
    this.objectService.$getObjectSource.subscribe(data => {
      this.fauna = data;
    }).unsubscribe(); 
  }

}
