import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import {parksInterface} from "../models/parks";


interface fandf {
  name : string
  type : string
  img : string 
  desc : string

}

@Injectable({
  providedIn: 'root'
})
export class ParksService {

  constructor(private Firedb : AngularFirestore,
     ) { }


  getParks(){
    return this.Firedb.collection('Parks').snapshotChanges().pipe(map(parkss =>{
      return parkss.map( a => {
        const data = a.payload.doc.data() as parksInterface;
        data.id = a.payload.doc.id;
        return data;

      })
    }))

  }

  saveParks(title : string, img : string, lat : number, lng : number, type : string, desc: string, uid: string,name_user:string){
    const id = this.Firedb.createId();
    return new Promise<void>((resolve, reject) => {
      this.Firedb.collection('Parks').doc(id).set({
          id : id,
          title : title,
          desc : desc,
          img : img,
          type : type,
          position : {
            lat : lat,
            lng : lng
          },
          user_id: {
            name_user :name_user,
            uid: uid
          }
    }).then(res => {
      resolve(res)
    }).catch(err => reject(err) );
    });
  }

  getPark(documentId : string){
    return this.Firedb.collection('Parks').doc(documentId).snapshotChanges();
  }

  deletePark(documentId : string){
    //this.ParkComponent.deleteIMG();
    return this.Firedb.collection('Parks').doc(documentId).delete();

  }
}
