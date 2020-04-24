import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

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
