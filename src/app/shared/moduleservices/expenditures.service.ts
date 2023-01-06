import { Injectable } from '@angular/core';
import { ApiService } from '../../providers/api.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Expendituresservice {
  apiURL = environment.apiUrl;

  constructor(private apiService: ApiService, private http: HttpClient) { }

  getExpenses(): Observable<any> {
    return this.apiService.getCall('/expense/getExpenses').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createExpense(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/expense/createExpense', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }


  cancelExpense(id: any,postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/expense/cancelExpense/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  expenseApproval(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/expense/expenseApproval/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getExpensesbyDate(postDataObj:any): Observable<any>{
    return this.apiService.postCall('/expense/getExpensesbyDate/', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  
  getExpenseById(id: any): Observable<any> {
    return this.apiService.getCall('/expense/getExpense/'+id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
