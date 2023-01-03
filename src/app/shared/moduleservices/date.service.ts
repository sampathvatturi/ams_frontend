import { Injectable } from '@angular/core';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import addYears from 'date-fns/addYears';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDate(date,dateFormate?){
    dateFormate = dateFormate || 'yyyy-MM-dd hh:mm:ss';
    return format(date,dateFormate);
  }

  getDateDiffrence(date:Date,difference:number,dateFormate?:string){
    dateFormate = dateFormate || 'yyyy-MM-dd hh:mm:ss';
    let updatedDate = format(addDays(date,difference),dateFormate)
    return updatedDate;
  }

  getYearDifference(date:Date,difference:number,dateFormate:string){
    dateFormate = dateFormate || 'yyyy-MM-dd hh:mm:ss';
    let updatedDate = format(addYears(date,difference),dateFormate)
    return updatedDate;
  }

}
