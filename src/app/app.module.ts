import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule  } from '@angular/fire/auth';
import {AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { FandfComponent } from './componentes/fandf/fandf.component';
import { FloraComponent } from './componentes/flora/flora.component';
import { FaunaComponent } from './componentes/fauna/fauna.component';
import { ParkComponent } from './componentes/Bioparks/park/park.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent,FandfComponent,FaunaComponent,FloraComponent,ParkComponent],
  entryComponents: [FandfComponent,FaunaComponent,FloraComponent,ParkComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
