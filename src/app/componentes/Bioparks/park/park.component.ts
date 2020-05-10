import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss'],
})
export class ParkComponent implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {}

  back(){
    this.modal.dismiss();
  }

}
