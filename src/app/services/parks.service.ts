import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ParksService {

  constructor(private db : AngularFirestore) { }


  getParks(){
    return this.db.collection('Parks').snapshotChanges();
  }

}
