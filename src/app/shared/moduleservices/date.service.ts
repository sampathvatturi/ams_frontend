import { Injectable } from '@angular/core';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import addYears from 'date-fns/addYears';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  dateFormatDays(date:Date,dateFormat:string,difference?:number){
    difference = difference || 0;
    let updatedDate = format(addDays(date,difference),dateFormat)
    return updatedDate;
  }
  dateFormatYears(date:Date,dateFormat:string,difference?:number){
    difference = difference || 0;
    let updatedDate = format(addYears(date,difference),dateFormat)
    return updatedDate;
  }

}
