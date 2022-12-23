import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private router: Router) { }

  private static data;
  private static ivrData;

  setSupportCallData(data) {
    TransferService.ivrData = data;
  }
  getSupportCallData() {
    return TransferService.ivrData;
  }
  setData(data) {
    TransferService.data = data;
  }

  getData() {
    return TransferService.data;
  }

  setLoclData(Key: string, data) {
    localStorage.setItem(Key, JSON.stringify(data))
  }

  getLoclData(Key: string) {
    var data
    data = localStorage.getItem(Key)
    return JSON.parse(data)
  }

  ClearLocalData(key: string) {
    localStorage.removeItem(key)
  }
  clearData() {
    TransferService.data = undefined;
  }
}
