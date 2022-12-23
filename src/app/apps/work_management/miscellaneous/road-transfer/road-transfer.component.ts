import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-road-transfer',
  templateUrl: './road-transfer.component.html',
  styleUrls: ['./road-transfer.component.scss']
})
export class RoadTransferComponent implements OnInit {
  validateForm!: FormGroup;
  validateForm1!: FormGroup;
  validateForm2!: FormGroup;
  rowData=[{"sno":1,
            "trnsr_id":1234,
            "prpsl_dt":"5/11/2015",
            "prpl_init_by_name":"Sagar",
            "prpl_init_by_dept":"Govt.AP",
            "dist":"East Godavari",
            "mand":"Rajanagaram",
            "rd_id":1,
            "trnsr_nu":"road1",
            "fl_lngth_trnsr_in":5,
            "trnsfr_lnth_ct":10,
            "prpsl_st":"1",
            "docs":"Sanction Letter"
            },
            {"sno":2,
            "trnsr_id":2134,
            "prpsl_dt":"7/10/2014",
            "prpl_init_by_name":"Sampath",
            "prpl_init_by_dept":"Govt.AP",
            "dist":"West Godavari",
            "mand":"Eluru",
            "rd_id":2,
            "trnsr_nu":"road2",
            "fl_lngth_trnsr_in":10,
            "trnsfr_lnth_ct":12,
            "prpsl_st":"2",
            "docs":"Sanction Letter"
            },
            {"sno":3,
            "trnsr_id":3214,
            "prpsl_dt":"9/10/2015",
            "prpl_init_by_name":"Rao",
            "prpl_init_by_dept":"Govt.AP",
            "dist":"Guntur",
            "mand":"Thadikonda",
            "rd_id":3,
            "trnsr_nu":"road3",
            "fl_lngth_trnsr_in":15,
            "trnsfr_lnth_ct":14,
            "prpsl_st":"1",
            "docs":"Sanction Letter"
            },
            {"sno":4,
            "trnsr_id":4231,
            "prpsl_dt":"3/11/2016",
            "prpl_init_by_name":"Sai Kumar",
            "prpl_init_by_dept":"Govt.AP",
            "dist":"Prakasham",
            "mand":"Ongole",
            "rd_id":4,
            "trnsr_nu":"road4",
            "fl_lngth_trnsr_in":20,
            "trnsfr_lnth_ct":16,
            "prpsl_st":"1",
            "docs":"Sanction Letter"
            },
            {"sno":5,
            "trnsr_id":1423,
            "prpsl_dt":"2/09/2015",
            "prpl_init_by_name":"Hari",
            "prpl_init_by_dept":"Govt.AP",
            "dist":"Chitoor",
            "mand":"Renigunta",
            "rd_id":5,
            "trnsr_nu":"road5",
            "fl_lngth_trnsr_in":25,
            "trnsfr_lnth_ct":18,
            "prpsl_st":"2",
            "docs":"Sanction Letter"
            },
            {"sno":6,
            "trnsr_id":3241,
            "prpsl_dt":"1/08/2015",
            "prpl_init_by_name":"Rana",
            "prpl_init_by_dept":"Govt.AP",
            "dist":"Krishna",
            "mand":"Vijayawada",
            "rd_id":6,
            "trnsr_nu":"road6",
            "fl_lngth_trnsr_in":22,
            "trnsfr_lnth_ct":20,
            "prpsl_st":"1",
            "docs":"Sanction Letter"
            }];
  data = {
    districts: [{
      id: 1,
      nm: "Krishna"
    },
    {
      id: 2,
      nm: "Chitoor"
    },
    {
      id: 3,
      nm: "Prakasham"
    },
    {
      id: 4,
      nm: "Guntur"
    },
    {
      id: 5,
      nm: "West Godavari"
    },
    {
      id: 6,
      nm: "East Godavari"
    }],
    mandals: [{
      id: 1,
      nm: "Vijayawada"
    },
    {
      id: 2,
      nm: "Rajanagaram"
    },
    {
      id: 3,
      nm: "Eluru"
    },
    {
      id: 4,
      nm: "Thadikonda"
    },
    {
      id: 5,
      nm: "Ongole"
    },
    {
      id: 6,
      nm: "Renigunta"
    }],
    proposal_pers:[
      'Sagar','Sampath','Rana','Rao','Sai Kumar','Hari'
    ],
    proposal_dept:[
      'Govt.AP'
    ]
  }

  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

  columnDefs = [
    { headerName: 'Sl.No.', field: 'sno', alignment: 'center', filter: false },
    { headerName: 'Road Transfer Identifier', alignment: 'left', field: 'trnsr_id' },
    { headerName: 'Proposal date', alignment: 'left', field: 'prpsl_dt' },
    { headerName: 'Proposal initiated by Name of the Person/ Organization/ Public Representative', alignment: 'left', field: 'prpl_init_by_name' },
    { headerName: 'Poroposal initiated by (Dept./ Public Representatives/ Govt)', alignment: 'center', field: 'prpl_init_by_dept' },
    { headerName: 'District', field: 'dist', alignment: 'left' },
    { headerName: 'Mandal', field: 'mand', alignment: 'center' },
    { headerName: 'Road Identifier', alignment: 'left', field: 'rd_id' },
    { headerName: 'Road type Name', field: 'trnsr_nu', alignment: 'center' },
    { headerName: 'Full length transfer indicator', alignment: 'center', field: 'fl_lngth_trnsr_in' },
    { headerName: 'Propose transferred length in km', alignment: 'center', field: 'trnsfr_lnth_ct' },
    { headerName: 'Stage of Proposal', alignment: 'left', field: 'prpsl_st' },
    { headerName: 'Upload Related documents', alignment: 'left', field: 'docs' },
  ]

  showForm: boolean = false;
  expandIconPosition:string = 'right';


  constructor(private msg: NzMessageService,
              private fb: FormBuilder
              ) { 
                this.addform();
                this.editform('');
                this.goform();
                this.hoform();
              }

  ngOnInit(): void {
    
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add Proposal',
        onClick: this.openSideBar.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

  openSideBar() {
    this.showForm = true;
    this.panels[0].active =true;
    this.addform();
  }

  openSideBarEdit(role,data:any){
    if(role==='edit'){
      this.showForm = true;
      this.panels[0].active =true;
      this.editform(data);
    }else if(role==='go'){
      this.showForm = true;
      this.panels[1].active =true;
      this.goform();
    }else{
      this.showForm = true;
      this.panels[2].active =true;
      this.hoform();
    }
  }
  addform(){
    this.validateForm = this.fb.group({
      datePicker: ['', [Validators.required]],
      prop_init_POPR: ['', [Validators.required]],
      prop_init_DPRG: ['', [Validators.required]],
      district: ['', [Validators.required]],
      mandal: ['', [Validators.required]],
      nameofroad: ['', [Validators.required]],
      lengthofroad: ['', [Validators.required]],
      lengthofroadproposed: ['', [Validators.required]]
    });
  }

  editform(data){
    console.log(data)
    this.validateForm = this.fb.group({
      datePicker: [data.prpsl_dt, [Validators.required]],
      prop_init_POPR: [data.prpl_init_by_name, [Validators.required]],
      prop_init_DPRG: [data.prpl_init_by_dept, [Validators.required]],
      district: [data.dist, [Validators.required]],
      mandal: [data.mand, [Validators.required]],
      nameofroad: [data.trnsr_nu, [Validators.required]],
      lengthofroad: [data.fl_lngth_trnsr_in, [Validators.required]],
      lengthofroadproposed: [data.trnsfr_lnth_ct, [Validators.required]]
    });
  }

  goform(){
    this.validateForm1 = this.fb.group({
      yr_of_odr: [null, [Validators.required]],
      datePicker1: [null, [Validators.required]],
      trns_go_prcdngs_num: [null, [Validators.required]],
      dist_name: [null, [Validators.required]],
      mandal_name: [null, [Validators.required]],
      road_id: [null, [Validators.required]],
      nameofroad1: [null, [Validators.required]],
      lengthofroadproposedgo: [null, [Validators.required]]
    });
  }

  hoform(){
    this.validateForm2 = this.fb.group({
      actl_lgt_aspr_site: [null, [Validators.required]],
      earthen: [null, [Validators.required]],
      gravel: [null, [Validators.required]],
      wbm: [null, [Validators.required]],
      bt: [null, [Validators.required]],
      cc: [null, [Validators.required]],
      num_of_pipeculvrts: [null, [Validators.required]],
      num_of_slabculvrts: [null, [Validators.required]],
      num_of_road_dams: [null, [Validators.required]],
      num_of_brdgs: [null, [Validators.required]],
      datePicker2: [null, [Validators.required]],
    });
  }
  close(): void {
    this.showForm = false;
    this.panels[0].active =false;
    this.panels[1].active =false;
    this.panels[2].active =false;
  }

  submitForm(): void {
    if(this.validateForm.valid){
      console.log('submit', this.validateForm.value);
    }
  }

  submitForm1(): void {
      console.log('submit', this.validateForm1.value);
  }
  submitForm2(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm2.value);
    } else {
    }
  }

 

  panels = [
    {
      active: false,
      name: 'Proposal Details',
      disabled: false
    },
    {
      active: false,
      disabled: false,
      name: 'G.O Details'
    },
    {
      active: false,
      disabled: false,
      name: 'HandOver Details'
    }
  ];

}
