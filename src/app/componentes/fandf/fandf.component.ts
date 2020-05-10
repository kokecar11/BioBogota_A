import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-fandf',
  templateUrl: './fandf.component.html',
  styleUrls: ['./fandf.component.scss'],
})
export class FandfComponent implements OnInit {

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
