import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import { Router } from '@angular/router';
import { resolve } from 'url';
import { AngularFirestore } from '@angular/fire/firestore';
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { auth } from 'firebase';
import {Facebook,FacebookLoginResponse} from '@ionic-native/facebook/ngx';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth : AngularFireAuth,
    private router : Router,
    private FireDB : AngularFirestore,
    private googlePlus : GooglePlus,
    private facebook : Facebook) { }

  login(email: string, password: string){
    
    return new Promise((resolve, rejected) =>{
      this.afAuth.signInWithEmailAndPassword(email,password).then(user => {
        resolve(user);
      }).catch(err => rejected(err))
    });
  }


  logout(){
    this.afAuth.signOut().then(() =>{
      this.googlePlus.disconnect();
      this.router.navigate(['/login']);
    });
    
  }

  register(email : string, password : string ,name :string){
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email,password).then(res =>{
        const user_id = res.user.uid;
        this.FireDB.collection('Users').doc(user_id).set({
            name : name,
            uid : user_id,
            email : email
          });
        resolve(res)
      }).catch(err => reject(err))
    });
    
  }

  LoginGoogle(){
    
    return this.googlePlus.login({}).then(result => {
      const UserDataGoogle = result;
      return this.afAuth.signInWithCredential(auth.GoogleAuthProvider.credential(null, UserDataGoogle.accessToken));
      
    });

  }

  async LoginFacebook(){

    return this.facebook.login(['email','public_profile']).then((response : FacebookLoginResponse) =>{
      const CredentialFacebook = auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      return this.afAuth.signInWithCredential(CredentialFacebook);

    });
  }


}
