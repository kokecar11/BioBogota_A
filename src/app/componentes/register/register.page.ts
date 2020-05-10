import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public name : string;
  public email : string;
  public password : string;
  public cpassword : string;

  constructor(private authService : AuthService,
    public alert: AlertController,
    private route : Router) { }

  ngOnInit() {
  }


  OnRegister(){
    if(this.cpassword == this.password){
      this.authService.register(this.email,this.password,this.name).then( res => {
        this.showAlert("Registro Completo!","Bienvenido a BioBogota!.");
        this.route.navigate(['folder/BioSitios']);
      }).catch(err => this.showAlert("Error!","No se puede registrar"));
    }else{
      this.showAlert("Error!","Las contraseñas no coinciden");
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
