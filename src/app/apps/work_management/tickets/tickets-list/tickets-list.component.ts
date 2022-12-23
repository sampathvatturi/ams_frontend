import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ToastrService } from 'ngx-toastr';
import { AppsService } from 'src/app/shared/services/apps.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {
  data = {
    tckt_dtls: null,
    tckt_ctgry_id: null,
    tckt_ctgry_nm : ''
  }

  usrdtls = {
    ste_nm: '',
    dstrt_nm: '',
    mndl_nm: '',
    mndl_id: ''
  };
  gpSelForm: any;
  gps: any;
  loader: boolean;
  columnDefs: any = [];
  disblesubmit: boolean;
  shwgrid: boolean = false;
  bnfcrydtls: any[];
  selectedItemKeys: any;
  shwSidebarTimeline: boolean;
  selectedbnfcry_id: any;
  pndg_cnt: any;
  postdata: any[];
  aprvebeneficiary: any;
  isVisible: boolean;
  desc_tx: any;
  timelineDtls: any;
  tcktID: any;

  
  constructor(public route: ActivatedRoute, private router: Router, private fb: FormBuilder, public apiSrv: AppsService,
    private message: NzMessageService, private toastr: ToastrService) {

    this.apiSrv.getLgnUsrDtls().then((res: any) => {
      console.log(res)
      if (res) {
        this.usrdtls = res;
        this.getGps();
      }
    });

    let nav_extrs = this.router.getCurrentNavigation().extras;
    if (nav_extrs && nav_extrs['state']) {
      let tcktDtls = nav_extrs['state'];
      if (tcktDtls['tcktDtls']) {
        tcktDtls = tcktDtls['tcktDtls'];
        this.data.tckt_dtls = tcktDtls['queryParams'];
        this.data.tckt_ctgry_id = tcktDtls['queryParams']['tckt_ctgry_id'];
        this.data.tckt_ctgry_nm = tcktDtls['queryParams']['tckt_ctgry_nm'];
      }
      console.log("TICKET DETAILS     ", tcktDtls);
    }


    this.columnDefs = [
      { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 'auto', filter: false, visible: true, },
      { headerName: 'Name', field: 'bnfcy_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 'auto', sortable: true, filter: true, visible: true, },
      { headerName: 'Mobile No', field: 'MOBILE_NO', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 'auto', visible: true, },
      { headerName: 'Date of Birth', field: 'DOB', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 'auto', visible: true, },
      { headerName: 'Father/Husband Name', field: 'BENEF_FATHER_HUSBAND_NAME', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 'auto', visible: true, },
      { headerName: 'Mother Name', field: 'bnfcy_mthr_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 'auto', visible: true, },
      { headerName: 'Gender', field: 'gndr_id', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 'auto', visible: true, },
      { headerName: 'Aadhar No', field: 'adhr_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 'auto', visible: true, },
      { headerName: 'Bank Name', field: 'bnk_nm', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 'auto', visible: true, },
      { headerName: 'Account No', field: 'bnk_acnt_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 'auto', visible: true, },
      { headerName: 'Payment Amount', field: 'amnt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 'auto', visible: true, },
    ];

  }



  ngOnInit(): void {
  
    this.gpSelForm = this.fb.group({
      grampanchayat: ['', [Validators.required]],
    });
    this.apiSrv.get(`iht/pndng_approvals/counts`).subscribe(res => {
      if (res['status'] == 200) {
        this.pndg_cnt = res['data'][0].pndng_aprvl_ct;
      }
    });
  }
  getGps() {
    const rte = 'master/getGrampnchyts/' + this.usrdtls.mndl_id;
    this.apiSrv.get(rte).subscribe(res => {
      if (res['status'] === 200) {
        this.gps = res['data'];
      }
    });
  }
  fetchDetails(t) {
    this.shwgrid = true;
    this.slctdGnrtSlryLst = [];
    if (!this.gpSelForm.valid) {
      this.toastr.error('Please select all the fields');
      return;
    }
    var tab_id = t;
    this.loader = true;
    this.bnfcrydtls = [];
    this.apiSrv.get('iht/beneficiary/user/all/' + this.gpSelForm.value.grampanchayat + '/0/0/' + tab_id).subscribe(res => {
      this.loader = false;
      if (res['status'] === 200) {
        this.bnfcrydtls = res['data'];

        this.bnfcrydtls.filter((k) => {
          if (k['sts'] == "Approved") {
            k['shwChkBox'] = false;
          }
          else {
            k['shwChkBox'] = true;
          }
        })

    


        this.disblesubmit = false;
      }
    }, (err) => {
      this.loader = false;

    });
  }
  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
  slctdGnrtSlryLst = []
  selectionChanged(data: any) {
    this.disblesubmit = false;
    this.slctdGnrtSlryLst = [];
    this.selectedItemKeys = data.selectedRowKeys;

    const SELECTEDKEYS = data.selectedRowKeys.filter(i => i.shwChkBox === true);
    // Filters the Keys from currentSelectedRowKeys to disable the checkbox, and IsNameExists is true  
    const DISABLEDKEYS = data.currentSelectedRowKeys.filter(i => (i.shwChkBox == false));
    if (DISABLEDKEYS.length > 0) {
      data.component.deselectRows(DISABLEDKEYS);
    }
    this.slctdGnrtSlryLst = SELECTEDKEYS;
  }
  overrideOnValueChanged(event) {
    if (event.parentType === "dataRow" && event.row.rowType === "data" && event.command === 'select') {
      event.editorOptions.disabled = !event.row.data.shwChkBox;
    }
  }
  shwTmelineDtls(data) {
    this.shwSidebarTimeline = true;
    this.disblesubmit = true;
    this.selectedbnfcry_id = data.data.bnfcy_id;
  }
  closeSideBar() {
    this.shwSidebarTimeline = false;
    this.disblesubmit = true;
    this.selectedbnfcry_id = false;
  }

  aprovefto() {
    this.postdata = [];
    this.postdata.push({
      "tckts_data": this.selectedItemKeys,
      "isApproved": 1
    })
    if (this.selectedItemKeys.length > 1) {
      this.toastr.warning('Please select single beneficiary');
    } else {
      this.loader = true;
      this.disblesubmit = true;
      this.apiSrv.post(this.postdata[0], 'iht/approval/work').subscribe(res => {
        this.loader = false;
        this.disblesubmit = false;
        if (res['status'] === 200) {
          this.toastr.success('Beneficiary Approved Successfully');
          this.aprvebeneficiary = res['data'];
        } else {
          this.toastr.error(res['message']);
        }
        this.fetchDetails(1);
      }, (err) => {
        this.loader = false;
        this.disblesubmit = false;
        this.toastr.error("Something went wrong. Please try again later.");
      });
    }
  }
  tabchange(e) {
    if (e.index == 0) {
      this.fetchDetails(1);
    } else if (e.index == 1) {
      this.fetchDetails(2);
    }
  }
  cancel(): void {
    this.message.info('Not rejected');
    this.isVisible = false
  }
  delete() {
    var postData = {
      rjct_cmnt_tx: this.desc_tx,
      tckt_id: this.selectedItemKeys[0].tckt_id,
      gp_id: this.selectedItemKeys[0].gp_id
    }
    this.loader = true;
    this.apiSrv.post(postData, 'iht/ticket/reject').subscribe(res => {
      this.loader = false;
      if (res['status'] == 200) {
        this.isVisible = false;
        this.toastr.success("Ticket rejected Successfully");
      } else {
        this.toastr.error(res['message']);
      }
      this.fetchDetails(1);
    }, (err) => {
      this.loader = false;
      this.toastr.error('Something went wrong.');
    });
  }
  rejectAprval() {
    this.tcktID = this.selectedItemKeys[0].tckt_id;
    if (this.selectedItemKeys && this.selectedItemKeys.length == 1) {
      this.isVisible = true;
    } else {
      this.toastr.warning('Please select single beneficiary');
    }
  }


}
