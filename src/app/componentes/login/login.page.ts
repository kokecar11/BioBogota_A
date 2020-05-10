import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService : AuthService,
    private route : Router,
    public alert: AlertController,) { }
   
   email : string ;
   password : string ;

  ngOnInit() {
  }


  OnLogin(){
    this.authService.login(this.email,this.password).then(res =>{
      this.showAlert("Excelente!","Bienvenido a BioBogota!.");
        this.route.navigate(['folder/BioSitios']);
    }).catch(err =>  this.showAlert("Error!","La información es Incorrecta!."));
    
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
