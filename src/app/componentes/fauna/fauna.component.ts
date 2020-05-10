import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: "app-fauna",
  templateUrl: "./fauna.component.html",
  styleUrls: ["./fauna.component.scss"],
})
export class FaunaComponent implements OnInit {
  constructor(private navparams: NavParams, private modal: ModalController) {}

  title: string;
  nameF: string;

  ngOnInit() {
    this.title = this.navparams.get("title");
    this.nameF = this.navparams.get("nameF");
  }

  backs() {
    this.modal.dismiss();
  }
}
