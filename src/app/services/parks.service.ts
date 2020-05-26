import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { map,take } from "rxjs/operators";
import {parksInterface} from "../models/parks";
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ParksService {
  private refPark = this.Firedb.collection('Parks');
//Servicio de los parques
  constructor(private Firedb : AngularFirestore,
     ) { }


//Obtiene todos los biositios que estan en la coleccion Parks
  getParks(){
    return this.refPark.snapshotChanges().pipe(map(parkss =>{
      return parkss.map( a => {
        const data = a.payload.doc.data() as parksInterface;
        data.id = a.payload.doc.id;
        return data;

      })
    }))

  }
//Guarda todos los datos del parque que se crea
  saveParks(title : string, img : string, lat : number, lng : number, type : string, desc: string, uid: string,name_user:string, name_img:string){
    const id = this.Firedb.createId();
    return new Promise<void>((resolve, reject) => {
      this.refPark.doc(id).set({
          id : id,
          title : title,
          desc : desc,
          img : img,
          name_img :name_img ,
          type : type,
          reactions:{},
          //reactions: firestore.FieldValue.arrayUnion(),
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

  //Obtiene un parque 
  getPark(documentId : string){
    return this.refPark.doc(documentId).valueChanges().pipe(take(1),map(park =>{
      const parks = park as parksInterface;
      return parks;
      
    }))
  }

  //Actualiza la informacion del Parque
  updatePark(documentId : string, title : string, img : string, lat : number, lng : number, type : string, desc: string, name_img:string){

    return this.refPark.doc(documentId).update({
          id : documentId,
          title : title,
          desc : desc,
          img : img,
          name_img :name_img ,
          type : type,
          position : {
            lat : lat,
            lng : lng
          },

    });

  }
//Elimina el parque 
  deletePark(documentId : string){
    return this.refPark.doc(documentId).delete();

  }
}
