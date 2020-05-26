import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  //servicio para enviar un objeto o una lista
  private objectSource = new BehaviorSubject<{}>({});
  private listSoruce = new BehaviorSubject<any[]>([]);

  $getObjectSource = this.objectSource.asObservable();
  $getListSource = this.listSoruce.asObservable();
  constructor() { }


  sendObjectSource(data:any){
    this.objectSource.next(data);
  }

  sendListSource(list:any[]){
    this.listSoruce.next(list);
  }

}
