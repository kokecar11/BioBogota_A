import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { map } from "rxjs/operators";

export interface parks {
  id : string; 
  title: string;
  img: string;
  type:string;
  position:{
    lat: number,
    lng: number,
  };
  fauna:{
    name:string,
    tipo:string,
    desc:string,

  };
  flora:{
    name:string,
    tipo:string,
    desc:string,
  };
  
}


@Injectable({
  providedIn: 'root'
})
export class ParksService {

  constructor(private Firedb : AngularFirestore) { }


  getParks(){
    return this.Firedb.collection('Parks').snapshotChanges().pipe(map(parkss =>{
      return parkss.map( a => {
        const data = a.payload.doc.data() as parks;
        data.id = a.payload.doc.id;
        return data;

      })
    }))

}
}
