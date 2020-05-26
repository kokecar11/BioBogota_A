import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { userInterface } from '../models/users';
import { map, take } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

//Servicio para Los Usuarios

  constructor(private Firedb : AngularFirestore) { 
  }

//Obtiene todos los usuarios en la plataforma
  getUsers(){
    return this.Firedb.collection('Users').snapshotChanges().pipe(map(userss =>{
      return userss.map( a => {
        const data = a.payload.doc.data() as userInterface;
        data.id = a.payload.doc.id;
        return data;
      })
    }))

  }
//Obtiene 1 usario.
  getOnceUser( uid : string ){
    return this.Firedb.collection('Users').doc(uid).valueChanges().pipe(take(1),map(user =>{
      const users = user as userInterface;
      return users;
      
    }))
  
  
  }


}
