import { Component, OnInit } from '@angular/core';
import { SurveyReportService } from 'src/app/shared/moduleservices/survey-report.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { GlobalConstants } from 'src/app/shared/common/global_constants';
import { environment } from 'src/environments/environment';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  styleUrls: ['./survey-report.component.scss']
})
export class SurveyReportComponent implements OnInit {
  tenders: any = [];
  visible = false;
  drawerTitle: string = '';
  survey_info: any = [];
  surveyForm!: UntypedFormGroup;
  updateBtnDisable: boolean = false;
  isLoading: boolean = false;
  submit: boolean = true;
  user_data: any = [];
  surveyId: any;
  files: any[] = [];
  filesDetails = {
    name: '',
    url: ''
  }
  baseUrl = environment.apiUrl;
  uploadUrl = this.baseUrl + '/upload/uploadFiles';
  getUploadedFIlesUrl = this.baseUrl + '/upload/getUploadedFiles/';
  isDisabled: boolean = false;
  upload:boolean = false;
  styles = {
    width: 100
  }

  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

  columnDefs = [
    { headerName: 'S.No.', field: 'sno', alignment: 'center', filter: false, width: '100', cellTemplate: 'serialNo' },
    { headerName: 'Name', alignment: 'left', field: 'name' },
    { headerName: 'Description', alignment: 'left', field: 'description', cellTemplate: 'description' },
    { headerName: 'Status', alignment: 'left', field: 'status', cellTemplate: 'statusTemplate' , width: '100'},
    { headerName: 'Start Date', alignment: 'left', field: 'start_date', width: '100', cellTemplate: 'startDate' },
    { headerName: 'End Date', alignment: 'left', field: 'end_date', width: '100', cellTemplate: 'endDate' }

  ]
  constructor(
    private fb: UntypedFormBuilder,
    private surveyReportService: SurveyReportService,
    private notification: NotificationService,
    private msg: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.surveyFormValidators();
    this.isLoading = true;
    this.getSurveyReport();
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
  }

  getSurveyReport() {
    this.isLoading = true;
    this.surveyReportService.getSurveyreports().subscribe((res) => {
      if (res.length > 0) {
        this.survey_info = res;
        this.isLoading = false;
      } else {
        this.survey_info = [];
      }
    })
  }
  onToolbarPreparing(e: any) {
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
    this.isDisabled = false;
    this.submit = true;
    this.upload = false
    this.drawerTitle = 'Add Survey Report';
    this.visible = true;
    this.filesDetails.name = '';
    this.filesDetails.url = '';
    this.files = [];
    this.surveyFormValidators();
    this.surveyForm.get('status')?.setValue('open');
  }

  edit(type: any, data: any) {
    this.visible = true;
    this.submit = false;
    if (type == 'edit') {
      this.isDisabled = false;
      this.upload = false;
      this.drawerTitle = 'Edit Survey Report';
      this.filesDetails.name = '';
      this.filesDetails.url = '';
      this.files = [];
      this.surveyFormValidators();
      this.surveyId = data?.id;
      this.surveyForm.get('status')?.setValue(data.status);
      this.surveyForm.get('name')?.setValue(data.name);
      this.surveyForm.get('description')?.setValue(data.description);
      this.surveyForm.get('start_date')?.setValue(data.start_date);
      this.surveyForm.get('end_date')?.setValue(data.end_date);
      if (data.attachments != null && data.attachments != '') {
        var fileNamesArray = data.attachments.split(',');
        if (fileNamesArray.length > 0) {
          fileNamesArray.forEach((element: any) => {
            this.filesDetails.name = element;
            this.filesDetails.url = this.getUploadedFIlesUrl + element;
            this.files.push(this.filesDetails);
          });
        }
      }
      this.updateBtnDisable = true;

    }

    if (type === 'view') {
      this.isDisabled = true;
      this.upload = true;
      this.updateBtnDisable = false;
      this.drawerTitle = 'View Survey Report';
      this.filesDetails.name = '';
      this.filesDetails.url = '';
      this.files = [];
      this.surveyFormValidators();
      this.surveyId = data?.id;
      this.surveyForm.get('status')?.setValue(data.status);
      this.surveyForm.get('name')?.setValue(data.name);
      this.surveyForm.get('description')?.setValue(data.description);
      this.surveyForm.get('start_date')?.setValue(data.start_date);
      this.surveyForm.get('end_date')?.setValue(data.end_date);
      if (data.attachments != null && data.attachments != '') {
        var fileNamesArray = data.attachments.split(',');
        if (fileNamesArray.length > 0) {
          fileNamesArray.forEach((element: any) => {
            this.filesDetails.name = element;
            this.filesDetails.url = this.getUploadedFIlesUrl + element;
            this.files.push(this.filesDetails);
          });
        }
      }

    }
  }

  prepareSurveyPayload(data: any) {

    const payload = {
      name: data.name,
      description: data.description,
      status: data.status,
      start_date: data.start_date,
      end_date: data.end_date,
      created_by: this.user_data.user_id,
      updated_by: this.user_data?.user_id,
      attachments: data.attachments
    }
    return payload;
  }

  onCreateSubmit() {
    if (this.surveyForm.valid) {
      var fileNames: any[] = [];
      this.files.forEach(element => {
        fileNames.push(element.name);
      });
      this.surveyForm.value.attachments = fileNames.toString();
      this.surveyReportService.createSurveyreport(this.prepareSurveyPayload(this.surveyForm.value)).subscribe((res) => {
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

  prepareUpdatePayload(data: any) {
    const payload = {
      name: data.name,
      description: data.description,
      status: data.status,
      start_date: data.start_date,
      end_date: data.end_date,
      updated_by: this.user_data?.user_id,
      attachments: data.attachments
    }
    return payload;
  }

  onUpdateSubmit() {
    if (this.surveyForm.valid) {
      var fileNames: any[] = [];
      this.files.forEach(element => {
        fileNames.push(element.name);
      });
      this.surveyForm.value.attachments = fileNames.toString();
      this.surveyReportService.updateSurveyreport(this.surveyId, this.prepareUpdatePayload(this.surveyForm.value)).subscribe((res) => {
        this.visible = false;
        this.getSurveyReport();
        this.notification.createNotification(res.status, res.message);

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
    this.updateBtnDisable = true;
  }
  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
      this.filesDetails.name = info.file.response.fileName;
      this.filesDetails.url = this.getUploadedFIlesUrl + '/' + info.file.response.fileName;
      this.files.push(this.filesDetails);
      console.log(this.files)
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    } else if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
  }

  handleRemove = (file: NzUploadFile) => new Observable<boolean>((obs) => {
    console.log(obs)
    obs.next(false)
  });

  surveyFormValidators() {
    this.surveyForm = this.fb.group({
      name: [{ value: '', disabled: this.isDisabled }, [Validators.required]],
      status: [{ value: '', disabled: this.isDisabled }, [Validators.required]],
      attachments: [''],
      description: [{ value: '', disabled: this.isDisabled }, [Validators.required]],
      start_date: [{ value: '', disabled: this.isDisabled }, [Validators.required]],
      end_date: [{ value: '', disabled: this.isDisabled }, [Validators.required]],
    });
  }
}
