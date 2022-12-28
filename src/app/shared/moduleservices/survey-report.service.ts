import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../providers/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyReportService {
  apiURL = environment.apiUrl;

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getSurveyreports():Observable<any>{
    return this.apiService.getCall('/surveyreport/getSurveyreports').pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  createSurveyreport(data: any): Observable<any> {
    return this.apiService.postCall('/surveyreport/createSurveyreport', data).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateSurveyreport(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/surveyreport/updateSurveyreport/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  getSurveyreport(id: any): Observable<any> {
    return this.apiService.getCall('/surveyreport/getSurveyreport/' + id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  deleteSurveyreport(id:any):Observable<any>{
    return this.apiService.deleteCall('/surveyreport/deleteSurveyreport/' + id).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
}
