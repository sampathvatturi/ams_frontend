import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AppsService } from 'src/app/shared/services/apps.service';

@Component({
  selector: 'app-category-dashboard',
  templateUrl: './category-dashboard.component.html',
  styleUrls: ['./category-dashboard.component.scss']
})
export class CategoryDashboardComponent implements OnInit {
  usrdtls: any;
  gettcktCounts: any;

  constructor(public apiSrv: AppsService, public router: Router,) {
    this.apiSrv.getLgnUsrDtls().then((res) => {
      console.log("USR DTLS ", res);
      if (res) {
        this.usrdtls = res;
        this.getDshbrdCunts();
      }
    })

  }

  ngOnInit(): void {

  }



  getDshbrdCunts() {
    console.log("get gettcktCounts")
    const rte = 'admin/category_dashboard/counts/' + this.usrdtls.usr_id;
    this.apiSrv.get(rte).subscribe(res => {
      console.log("COUNT RES ", res)
      if (res['status'] === 200) {
        this.gettcktCounts = res['data'];
        console.log(this.gettcktCounts)
      } else {

      }
    }, (err)=>{

    });
  }


  openTcktLstPage(c) {
    let objToSend: NavigationExtras = {
      queryParams: {
        tckt_ctgry_id: c.tckt_ctgry_id,
        tckt_ctgry_nm : c.tckt_ctgry_nm
      }
    };
    this.router.navigate(['/internal/work-mng/tickets/list'], {
      state: { tcktDtls: objToSend }
    });
  }
}
