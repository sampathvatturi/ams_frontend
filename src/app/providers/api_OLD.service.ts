import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class ApiService {

  USER_PERMISSIONS = { "slct_in": 0, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 };

  constructor(private http: HttpClient) { }

  // ----------------------------------
  create(postdata, rte) {
    console.log("GPOST-CREATE"+rte)
    return this.http.post(`/${rte}`, { data: postdata });
  }
  post(postdata, rte) {
    console.log("POST"+rte)
    return this.http.post(`/${rte}`, postdata);
  }
  get(rte) {
    console.log("GET"+rte)
    return this.http.get(`/${rte}`);
  }

  update(postdata, rte) {
    console.log("PUT"+rte)
    return this.http.put(`/${rte}`, { data: postdata });
  }

  put(postdata, rte) {
    console.log("PUT2"+rte)
    return this.http.put(`/${rte}`, { data: postdata });
  }

  delete(rte) {
    console.log("DELETE"+rte)
    return this.http.delete(`/${rte}`);
  }

}
