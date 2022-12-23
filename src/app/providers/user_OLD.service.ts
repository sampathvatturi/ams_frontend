import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/providers/api_OLD.service'
import { Observable, Observer, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  usrDtls;
  private usrPfleDtls = new BehaviorSubject([]);
  currentUserData = this.usrPfleDtls.asObservable();

  constructor(private apisrvce: ApiService) {
    this.usrDtls = JSON.parse(localStorage.getItem('userdata'));
 //   console.log("ncjhdfghyudsgfyusdgfusdgfusgdfuigsduifsyudgfuys")
    this.getUsrPrfileDtls();
   }
   getUsrPrfileDtls() {
  //   console.log("ncjhdfghyudsgfyusdgfusdgfusgdfuigsduifsyudgfuys")
    let rte = `/getUsrPrfle/${this.usrDtls.usr_id}`
    this.apisrvce.get(rte).subscribe(res => {
  //   //   console.log(res)
        return this.usrPfleDtls.next(res['data'])
    })
}
}
