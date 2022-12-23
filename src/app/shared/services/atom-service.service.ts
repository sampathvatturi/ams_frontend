import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtomServiceService {

  constructor() { }
  private dropDown = new BehaviorSubject<any>({});
  dropDownData = this.dropDown.asObservable();
  
  dropDownChange(field){
    this.dropDown.next(field); 
  }
}
