import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { userInterface } from './models/users';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {


  public selectedIndex = 0;
  public appPages = [
    {
      title: 'BioParques',
      url: '/folder/BioParques',
      icon: 'mail'
    },
    {
      title: 'BioRestaurantes',
      url: '/folder/BioRestaurantes',
      icon: 'paper-plane'
    },
    {
      title: 'BioSenderos',
      url: '/folder/BioSenderos',
      icon: 'heart'
    },
    {
      title: 'Mis BioSitios',
      url: '/biositios',
      icon: 'heart'
    },
  ];


  public user2 : userInterface;
  uid : string
 

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
    public route: Router,
    private authService : AuthService,
    private userService: UsersService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    
  }

  ngOnInit() {
    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this.userService.getOnceUser(this.uid).subscribe(users =>{
      return this.user2 = users;
    })
    console.log(this.uid)
  }

  OnLogout(){
    this.authService.logout(); 
    console.log(this.uid)
  }

}
