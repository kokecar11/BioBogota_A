import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ReactionsService {
  constructor(private FireDB : AngularFirestore) { }
//Servicio de reacciones = Likes
  private refPark = this.FireDB.collection('Parks');

//Agrega 1 like para los parques.
  addLike2(idPark : string, uid : string){
    
    this.refPark.doc(idPark).update({
      reactions : firestore.FieldValue.arrayUnion(uid)
    })
  }

//Agrega Likes a la Fauna o Flora
  addLikeF(idPark : string,idF : string,type_f: string, uid : string){
    
    this.refPark.doc(idPark).collection(type_f).doc(idF).update({
      reactions : firestore.FieldValue.arrayUnion(uid)
    })
  }
//Elimina el like que de el usuario en la Fauna o Flora.
  deleteLikeF(idPark : string,idF : string,type_f: string, uid : string){
    this.refPark.doc(idPark).collection(type_f).doc(idF).update({
      reactions : firestore.FieldValue.arrayRemove(uid)
    })

  }

//Elimina Like que de el usuario en el parque.
  deleteLike(idPark : string, uid : string){
    this.refPark.doc(idPark).update({
      reactions : firestore.FieldValue.arrayRemove(uid)
    })

  }

}
