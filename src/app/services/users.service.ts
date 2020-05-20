import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { userInterface } from '../models/users';
import { map, take } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {



  constructor(private Firedb : AngularFirestore) { 
  }


  getUsers(){
    return this.Firedb.collection('Users').snapshotChanges().pipe(map(userss =>{
      return userss.map( a => {
        const data = a.payload.doc.data() as userInterface;
        data.id = a.payload.doc.id;
        return data;
      })
    }))

  }

  getOnceUser( uid : string ){
    return this.Firedb.collection('Users').doc(uid).valueChanges().pipe(take(1),map(user =>{
      const users = user as userInterface;
      return users;
      
    }))
  
  
  }


}
