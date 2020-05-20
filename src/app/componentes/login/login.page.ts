import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService : AuthService,
    private route : Router,
    public alert: AlertController,
    private FireDB : AngularFirestore) { }
   
   email : string ;
   password : string ;

  ngOnInit() {
  }


  OnLogin(){
    this.authService.login(this.email,this.password).then(res =>{
      this.showAlert("Excelente!","Bienvenido a BioBogota!.");
        this.route.navigate(['folder/BioParques']);
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


  OnLoginGoogle(){

    this.authService.LoginGoogle().then( res =>{
      this.showAlert("Excelente!","Bienvenido a BioBogota!.");
      this.SaveFireUser(res)
        this.route.navigate(['folder/BioParques']);
    }).catch(err =>  this.showAlert("Error!","Algo salio mal!."));
    
  }

  OnLoginFacebook(){
    this.authService.LoginFacebook().then( res =>{
      this.showAlert("Excelente!","Bienvenido a BioBogota!.");
      this.SaveFireUser(res);
      this.route.navigate(['/folder/BioParques'])
    }).catch(err =>  this.showAlert("Error!","Algo salio mal!."));

  }


  SaveFireUser(res:any){
    this.FireDB.collection('Users').doc(res.user.uid).set({
      name : res.user.displayName ,
      uid : res.user.uid,
      email : res.user.email
    });
  }

}
