import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  subject = new Subject;

  setMessage(msg){
  	this.subject.next(msg);
  }

   getMessage(){
  	return this.subject.asObservable();
  }

}
