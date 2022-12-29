import { Component, OnInit } from '@angular/core';
import { SurveyReportService } from 'src/app/shared/moduleservices/survey-report.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/common/notification.service';


@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  styleUrls: ['./survey-report.component.scss']
})
export class SurveyReportComponent implements OnInit {

  tenders: any = [];
  visible = false;
  drawerTitle: string = '';
  survey_info:any = [];
  surveyForm!: UntypedFormGroup;
  updateBtnDisable: boolean = false;
  isLoading: boolean;
  submit:boolean = true;
  user_data:any = [];
  surveyId:any;

  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

  columnDefs = [
    { headerName: 'Name', alignment: 'left', field: 'name' },
    { headerName: 'Description', alignment: 'left', field: 'description' },
    { headerName: 'Status', alignment: 'left', field: 'status' },

  ]
  constructor(
    private fb: UntypedFormBuilder,
    private surveyReportService:SurveyReportService,
    private notification:NotificationService,

  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.surveyFormValidators();
    this.getSurveyReport();
    this.user_data = sessionStorage.getItem('user_data');
      this.user_data = JSON.parse(this.user_data);

  }

  

  getSurveyReport(){
    this.surveyReportService.getSurveyreports().subscribe((res) => {
      if (res.length > 0) {
        this.survey_info = res;
        this.isLoading = false;

      } else {
        this.survey_info = [];
      }
    })
  }
  onToolbarPreparing(e:any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add',
        onClick: this.create.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
    
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Work';
    this.visible = true;
    this.surveyFormValidators();
    this.surveyForm.get('status')?.setValue('open');
  }

  edit(type: any, data: any) {
    this.drawerTitle = 'Edit Survey Report';
    this.visible = true;
    this.submit = false;
    this.surveyFormValidators();
    this.surveyId = data?.id;
    this.surveyForm.get('status')?.setValue(data.status);
    this.surveyForm.get('name')?.setValue(data.name);
    this.surveyForm.get('description')?.setValue(data.description);
    this.updateBtnDisable = true;
    if (type === 'view') {
      this.updateBtnDisable = false;
      this.drawerTitle = 'View Survey Report';
    }
  }

  prepareSurveyPayload(data:any){
    const payload = {
      name:data.name,
      description:data.description,
      status:data.status,
      created_by:this.user_data.user_id,
      updated_by:this.user_data?.user_id
    }
    return payload;
  }

  onCreateSubmit() {
    if (this.surveyForm.valid){
      this.surveyReportService.createSurveyreport(this.prepareSurveyPayload(this.surveyForm.value)).subscribe((res)=>{
          this.visible = false;
          this.getSurveyReport();
          this.notification.createNotification("success", res?.message);
      });
    }
    else {
      console.log('invalid')
      Object.values(this.surveyForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  prepareUpdatePayload(data:any){
    const payload = {
      name:data.name,
      description:data.description,
      status:data.status,
      updated_by:this.user_data?.user_id
    }
    return payload;
  }

  onUpdateSubmit() {
    if (this.surveyForm.valid) {
      this.surveyReportService.updateSurveyreport(this.surveyId, this.prepareUpdatePayload(this.surveyForm.value)).subscribe((res) => {
        this.visible = false;
        this.getSurveyReport();
        this.notification.createNotification(res.status,res.message);        
        
      });
    } else {
      Object.values(this.surveyForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  close(): void {
    this.visible = false;
  }
  surveyFormValidators() {
    this.surveyForm = this.fb.group({
      name:['',[Validators.required]],
      status: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
}
