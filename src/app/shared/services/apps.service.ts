import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../interfaces/chat.type';
import { Files } from '../interfaces/file-manager.type';
import { Mail } from '../interfaces/mail.type';
import { ProjectList } from '../interfaces/project-list.type';

@Injectable()
export class AppsService {
  constructor(private http: HttpClient) { }

  public getChatJSON(): Observable<Chat[]> {
    return this.http.get<Chat[]>("./assets/data/apps/chat-data.json")
  }

  public getFileManagerJson(): Observable<Files[]> {
    return this.http.get<Files[]>("./assets/data/apps/file-manager-data.json")
  }

  public getMailJson(): Observable<Mail[]> {
    return this.http.get<Mail[]>("./assets/data/apps/mail-data.json")
  }

  public getProjectListJson(): Observable<ProjectList[]> {
    return this.http.get<ProjectList[]>("./assets/data/apps/project-list-data.json")
  }


  USER_PERMISSIONS = { "slct_in": 0, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 };



  create(postdata, rte) {
    return this.http.post(`/${rte}`, { data: postdata });
  }
  put(postdata, rte) {
    return this.http.put(`/${rte}`, { data: postdata });
  }
  post(postdata, rte) {
    if (rte.indexOf("http") > -1) {
      return this.http.post(`${rte}`, postdata);
    } else {
      return this.http.post(`/${rte}`, postdata);
    }
  }
  get(rte) {
    console.log("GET route ::" + rte)
    if (rte.indexOf("http") > -1) {
      return this.http.get(`${rte}`);
    } else {
      return this.http.get(`/${rte}`);
    }

  }
  update(postdata, rte) {
    return this.http.put(`/${rte}`, postdata);
  }
  delete(rte) {
    return this.http.delete(`/${rte}`);
  }

  getLgnUsrDtls() {
   return new Promise((resolve, reject) => {
      let usr = localStorage.getItem('userdata');
      if (usr) {
        resolve(JSON.parse(usr))
      }
      else {
        reject(null)
      }
    });
  }

}