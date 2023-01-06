import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../providers/api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private apiService: ApiService) { }
  getTransactions(postDataObj: any): Observable<any> {
    // return this.apiService.getCall('/transaction/getTransactions').pipe(
    //   map((response: any) => {
    //     return response;
    //   })
    // );
    return this.apiService.postCall('/transaction/getTransactions', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createTransaction(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/transaction/createTransaction', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getTransactionCount(postDataObj:any): Observable<any> {
    return this.apiService.postCall('/transaction/getTransactionsCount', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getTrailBalance(): Observable<any> {
    return this.apiService.getCall('/transaction/getTrailBalance').pipe(
      map((response: any) => {
        return response;
      })
    )
  }
}
