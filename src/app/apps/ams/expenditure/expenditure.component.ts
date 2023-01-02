import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.scss']
})
export class ExpenditureComponent implements OnInit {

  visible = false;
  submit = true;
  expenditureForm!: UntypedFormGroup;
  expenditure_info: any = [];
  user_data: any = [];
  searchText = '';
  updateBtnDisable: boolean = true;
  showBtn:boolean = true;
  drawerTitle: string = '';
  files = [];
  baseUrl = environment.apiUrl;
  uploadUrl = this.baseUrl + '/upload/uploadFiles';
  getUploadedFIlesUrl = this.baseUrl + '/upload/getUploadedFiles/';
  invoiceId: any;
  isLoading: boolean = true;
  isDisabled:boolean = false;
  uploadDisabled:boolean = false;
  filesDetails = {
    name : '',
    url:''
  }
  uploadDisable:boolean = false;
  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

  columnDefs = [
    { headerName: 'Invoice Number', field: 'invoice_number', alignment: 'center', filter: false, width: 150 },
    { headerName: 'Desctiption', field: 'description', alignment: 'center', width: 175 },
    { headerName: 'Category', field: 'category', alignment: 'center', width: 125, },
    { headerName: 'Amount', field: 'amount', alignment: 'center', width: 175, },
    { headerName: 'Tax', field: 'tax', alignment: 'center', width: 175, },
    { headerName: 'Total', field: 'total', alignment: 'center', width: 175, },
  ];


  constructor(
    private fb: UntypedFormBuilder,
    private notification: NotificationService,
    private msg: NzMessageService
  ) {
    
   }

  

  ngOnInit(): void {
    this.isLoading = true;
    this.expenditureFormValidators();
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.getExpenditure()
  }

  getExpenditure():void{
    this.isLoading = true ;
    // this.expenditureService.getExpenditure().subscribe((res) =>{
    //   this.expenditure_info = res;
    //   this.expenditure_info.forEach((elem:any,index:any)=>{
    //     elem['sno']=index+1;
    //   })
    //   this.isLoading = false;
    // });
  }

  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add Expenditure',
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
    this.drawerTitle = 'Add Expenditure';
    this.visible = true;
    this.filesDetails.name='';
    this.filesDetails.url='';
    this.files=[];
    this.expenditureFormValidators();
    this.expenditureForm.get('invoice_number')?.setValue('');
    // this.expenditureForm.get('amount')?.setValue(0);
    // this.expenditureForm.get('tax')?.setValue(0);

    
  }

  close(): void {
    this.visible = false;
    this.updateBtnDisable = true;
  }

  prepareExpenditurePayload(data:any){
    const payload = {
      invoice_number:data.invoice_number,
      description:data.description,
      category:data.category,
      amount:data.amount,
      tax:data.tax,
      total:data.total,
      created_by:this.user_data.user_id,
      updated_by:this.user_data?.user_id
    }
    return payload;
  }

  edit(type:any,data: any) {
    this.submit = false;
    // this.expenditureId = data?.id;
    this.visible = true;
 
    if (type == 'edit'){
      this.isDisabled = false;
      this.uploadDisable = false;
      this.drawerTitle = 'Edit Expenditure Details';
      this.updateBtnDisable = true;
      this.expenditureFormValidators();
          // this.expenditureId = data?.id;
      this.expenditureForm.get('description')?.setValue(data.description);
      this.expenditureForm.get('invoice_number')?.setValue(data.invoice_number);
      this.expenditureForm.get('amount')?.setValue(data.amount);
      this.expenditureForm.get('total')?.setValue(data.total);
      this.expenditureForm.get('tax')?.setValue(data.total);
      this.expenditureForm.get('category')?.setValue(data.category);
      if(data.attachments != null && data.attachments !=''){
        var fileNamesArray = data.attachments.split(',');
        if(fileNamesArray.length > 0){
          fileNamesArray.forEach((element:any) => {
            this.filesDetails.name=element;
            this.filesDetails.url=this.getUploadedFIlesUrl+element;
            this.files.push(this.filesDetails);
          });
        }
      }
    }
    if(type == 'view'){
      this.isDisabled = true;
      this.uploadDisable = true;
      this.drawerTitle = 'View Expenditure Details';
      this.updateBtnDisable = false;
      this.expenditureFormValidators();
      this.expenditureForm.get('description')?.setValue(data.description);
      this.expenditureForm.get('invoice_number')?.setValue(data.invoice_number);
      this.expenditureForm.get('amount')?.setValue(data.amount);
      this.expenditureForm.get('total')?.setValue(data.total);
      this.expenditureForm.get('tax')?.setValue(data.total);
      this.expenditureForm.get('category')?.setValue(data.category);
      if(data.attachments != null && data.attachments !=''){
        var fileNamesArray = data.attachments.split(',');
        if(fileNamesArray.length > 0){
          fileNamesArray.forEach((element:any) => {
            this.filesDetails.name=element;
            this.filesDetails.url=this.getUploadedFIlesUrl+element;
            this.files.push(this.filesDetails);
          });
        }
      }
    }
  }

  onCreateSubmit() {
    if (this.expenditureForm.valid){
      // this.expenditureService.createExpenditure(this.prepareExpenditurePayload(this.expenditureForm.value)).subscribe((res)=>{
      //     this.visible = false;
      //     this.();
      //     this.notification.createNotification("success", res?.message);
      // });
    }
    else {
      console.log('invalid')
      Object.values(this.expenditureForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  prepareUpdatePayload(data:any){
    const payload = {
      invoice_number:data.invoice_number,
      description:data.description,
      category:data.category,
      amount:data.amount,
      tax:data.tax,
      total:data.total,
      updated_by:this.user_data?.user_id
    }
    return payload;
  }

  onUpdateSubmit() {
    if (this.expenditureForm.valid) {
      // this.expenditureService.updateExpenditure(this.expenditureId, this.prepareUpdatePayload(this.expenditureForm.value)).subscribe((res) => {
      //   this.notification.createNotification(res.status,res.message);        
      //   this.visible = false;
      //   this.getExpenditure();
      // });
    } else {
        console.log('invalid')
        Object.values(this.expenditureForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
  }

  change() {
    // let total = this.expenditureForm.value.amount + (this.expenditureForm.value.amount * (this.expenditureForm.value.tax / 100));

    // console.log(this.expenditureForm.value.amount)
    // console.log(this.expenditureForm.value.tax / 100)
    // this.expenditureForm.get('total')?.setValue(total);

    
    let taxAmt = this.expenditureForm.value.tax;
    let amount = this.expenditureForm.value.amount;

    if (taxAmt !==0 && amount !==0){
    let total = parseInt(this.expenditureForm.value.amount) + (parseInt(this.expenditureForm.value.amount) * (this.expenditureForm.value.tax / 100));
    this.expenditureForm.get('total')?.setValue(total);
    console.log(total)

    }
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
      this.files.push({ name: info.file.response.fileName, url: this.getUploadedFIlesUrl + info.file.response.fileName });
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    } else if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
  }

  previewImage = '';
  previewVisible = false;




  handleRemove = (file: NzUploadFile) => new Observable<boolean>((obs) => {
    // console.log(file);
    // console.log('this.handleRemove instanceof Observable', this.handleRemove instanceof Observable)
    console.log(obs)
    obs.next(false)
    // this.http.post('http://localhost:8080/upload/deleteFile')
  });

  expenditureFormValidators(){
    this.expenditureForm = this.fb.group({
      invoice_number: [''],
      description:[''],
      category:[''],
      amount:[0],
      tax:[0],
      total:[0],
      created_by: [''],
      updated_by: ['']
    });
  }

}
