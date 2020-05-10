import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-flora',
  templateUrl: './flora.component.html',
  styleUrls: ['./flora.component.scss'],
})
export class FloraComponent implements OnInit {

  constructor(private navparams : NavParams,
    private modal : ModalController) { }
  title : string;
  nameF : string;
  ngOnInit() {
    this.title = this.navparams.get('title');
    this.nameF = this.navparams.get('nameF');
  }

  back(){
    this.modal.dismiss();
  }


}
