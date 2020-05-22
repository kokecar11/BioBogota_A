import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { parksInterface } from '../models/parks';
import { fandfInterface } from '../models/fandf';

@Injectable({
  providedIn: 'root'
})
export class FandFService {

  constructor(
    private FireDB : AngularFirestore,
    
  ) { }

  getAllFandF(idPark : string,type : string){
   return this.FireDB.collection('Parks').doc(idPark).collection(type).snapshotChanges().pipe(map(fauna =>{
    return fauna.map( a => {
      const data = a.payload.doc.data() as parksInterface;
      data.id = a.payload.doc.id;
      return data;

    })
  }))

  }

  saveFandF(name : string, img : string, type_f : string, desc : string,lat : number, lng : number,idPark : string, uid : string, name_user : string, name_img : string){
    const id = this.FireDB.createId();
    const refPark = this.FireDB.collection('Parks').doc(idPark);
    return new Promise<void>((resolve, reject) => {
      refPark.collection(type_f).add({
          id : id, 
          name : name,
          img : img,
          name_img : name_img,
          type_f : type_f,
          desc : desc,
          position : {
            lat : lat,
            lng : lng
          },
          user_id: {
            name_user :name_user,
            uid: uid
          }
        
        
      }).then(() => {
        resolve()
      }).catch(err => reject(err))

    });

  }

  updateFandF(){

  }

  deleteFandF(idPark : string, documentId : string, type : string){

    return this.FireDB.collection('Parks').doc(idPark).collection(type).doc(documentId).delete();

  }



}
