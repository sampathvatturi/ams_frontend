import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-wise-master',
  templateUrl: './work-wise-master.component.html',
  styleUrls: ['./work-wise-master.component.scss']
})
export class WorkWiseMasterComponent implements OnInit {
  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  columnDefs;
  rowData;
  workWiseForm: FormGroup;
  data = {
    sd_nv_hdng :''
  };
  settings = {
    shw_sd_nv: false
  };
  setting1 = {
    isBtnLoading : false
  };
  constructor(private fb: FormBuilder) {
    this.workWiseForm = this.fb.group({
      prjct_nm: [null, [Validators.required]],
      wn_nu: [null, [Validators.required]],
      dscn_tx: [null, [Validators.required]],
      estmd_cst_at: [0, [Validators.required]],
      wrk_ordr_cst_at: [0, [Validators.required]],
      rlsd_at: [0, [Validators.required]],
      strt_dt: [null, [Validators.required]],
      pln_end_dt: [null, [Validators.required]],
      actl_end_dt: [null,[Validators.required]],
      prjct_stge_id: [null, [Validators.required]],
      prjct_type_id: [null, [Validators.required]],
      mbk_nu: [null, [Validators.required]],
      dprmt_id: [null, [Validators.required]],
      agncy_id: [null, [Validators.required]],
      wrd_id: [null, [Validators.required]],
      cmpld_prcnt_ct: [null, [Validators.required]],
    });

  }

  ngOnInit(): void {
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Works',
        onClick: this.openSideBar.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

  openSideBar() {
    this.settings.shw_sd_nv = true;
    this.data.sd_nv_hdng = "Work Wise Details";
  }
  closeSideBar() {
    this.settings.shw_sd_nv = false;
  }
  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getEdtrEntrTxt(edtr_txt){
    console.log(edtr_txt)
  }
}


