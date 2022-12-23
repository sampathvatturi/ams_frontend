import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-grant-reg-form',
  templateUrl: './grant-reg-form.component.html',
  styleUrls: ['./grant-reg-form.component.scss']
})
export class GrantRegFormComponent implements OnInit {

  grantRegForm: FormGroup;

  data = {
    grnt_lst: [{
      grnt_id: 1,
      grnt_nm: "CRR"
    },
    {
      grnt_id: 2,
      grnt_nm: "MRR"
    },
    {
      grnt_id: 3,
      grnt_nm: "DPRO Bldgs."
    }],

    grnt_ctgry_lst: [{
      grnt_ctgry_id: 1,
      grnt_ctgry_nm: "Plain"
    },
    {
      grnt_ctgry_id: 2,
      grnt_ctgry_nm: "SCP"
    },
    {
      grnt_ctgry_id: 3,
      grnt_ctgry_nm: "TSP"
    }],
    grnt_ctgry_acnt_hds_lst_t: [{
      acnt_hd_ky: 1,
      acnt_hd_nu: "4515-00-101-25-22-560-531"
    }],

    grnt_sctn_yr_lst: [{
      yr_id: 1,
      yr_nm: "2019-20"
    }],

    atchmnt_grnt_id: 1,
    atchmnt_hndlr_tx: "GRNT_SNCTN_REG"
  }

  settings = {
    isBtnLoading : false
  }

  constructor(private fb: FormBuilder) {
   this.myform();

  }

  ngOnInit(): void {
  }

  myform(){
    this.grantRegForm = this.fb.group({
      grnt_id: [null, [Validators.required]],
      grnt_ctgry_id: [null, [Validators.required]],
      acnt_hd_ky: [null, [Validators.required]],
      yr_id: [null, [Validators.required]],
      be_cr_ct: [null, [Validators.required, Validators.minLength(0)]],
      adtnl_be_ct: [null, [Validators.minLength(0)]],
      rvsd_be_ct: [null, [Validators.minLength(0)]],
      grnt_rlsd_ct: [null, [Validators.minLength(0)]],
      dscn_tx: [null],
      rlsd_dt: [null, [Validators.required]]
    });

  }
  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getEdtrEntrTxt(edtr_txt){
    console.log(edtr_txt)
  }
}
