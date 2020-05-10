import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

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
      title: 'Camara',
      url: '/camera',
      icon: 'camera'
    }
  ];
  public labels = [];

 

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
    public route: Router,
    private authService : AuthService,
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
  }

  OnLogout(){
    this.authService.logout();
  }

}
