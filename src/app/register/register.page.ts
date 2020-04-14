import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {AlertController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email : string = ""
  password : string = ""
  cpassword : string = ""
  constructor(
      public afAuth: AngularFireAuth,
      public alert: AlertController,
      public route: Router) { }

  ngOnInit() {
  }

  async register(){

    const {email, password,cpassword} = this
    if(password != cpassword){
        return this.showAlert("Error","Las Constraseñas No Coinciden.")
    }

    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(email,password);
      this.showAlert("Excelente!","Registro Completo, Bienvenido!.")
      this.route.navigate(['folder/BioSitios']);
    } catch (error) {
        console.dir(error)
        this.showAlert("Error!",error.message)
    }

  }


  async showAlert(header:string , message:string){
      const alert = await this.alert.create({
        header,
        message,
        buttons:["Ok"]
      });

      await alert.present();
  }

}
