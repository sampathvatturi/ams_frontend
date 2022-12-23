import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = environment.apiUrl;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient 
  ) { }

  postCall(urlPath: string, postDataObj: any): Observable<any> {
    const url = this.apiURL + urlPath;
    return this.http.post(url, postDataObj, this.httpOptions);
  }

  getCall(urlPath: string): Observable<any> {
    const url = this.apiURL + urlPath;
    console.log(url);
    return this.http.get(url,this.httpOptions)
  }

  updateCall(urlPath: string, postDataObj: any): Observable<any> {
    const url = this.apiURL + urlPath;
    return this.http.put(url, postDataObj, this.httpOptions)
  }

  patchCall(urlPath: string, postDataObj: any): Observable<any> {
    const url = this.apiURL + urlPath;
    return this.http.patch(url, postDataObj, this.httpOptions)
  }

  deleteCall(urlPath: string): Observable<any> {
    const url = this.apiURL + urlPath;
    return this.http.delete(url, this.httpOptions)
  }

}
