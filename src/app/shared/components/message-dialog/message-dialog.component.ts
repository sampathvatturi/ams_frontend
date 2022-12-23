import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AppsService } from 'src/app/shared/services/apps.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {

  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() deldata;
  @Input() formDetails;
  flag: boolean;
  flag1: boolean;
  results: any;
  flag2: boolean;
 
  constructor( public modalRef: NzModalRef,private toastr: ToastrService, public apiSrv: AppsService, ) { }

  ngOnInit(): void {
  // console.log(this.deldata)
  // console.log(this.formDetails)
  }


  delete(){
    this.flag = false;
    this.apiSrv.create(this.deldata,this.formDetails.apis.del_url).subscribe((res) => {
      this.results = res;
      if (res['status'] == 200) {
        this.flag = true;
        this.flag2 = true;
      }
      else {
       
        this.toastr.error( res["message"], '', {
         timeOut: 10000,
         positionClass: 'toast-top-right',
       });
     }

    }, (error) => {
      this.flag1 = true;
      this.flag = false;
      this.flag2 = true;
    });
  }

  close(){
    this.modalRef.close();
  }

  

}
