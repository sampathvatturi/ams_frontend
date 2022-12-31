import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder ,Validators,UntypedFormGroup} from '@angular/forms';
import { getWeekYearWithOptions } from 'date-fns/fp';
import { UomService } from 'src/app/shared/moduleservices/uom.service';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { GlobalConstants } from 'src/app/shared/common/global_constants';
// import { NzMessageService } from 'ng-zorro-antd/message ';
// import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.scss']
})

export class UomComponent implements OnInit {
  // validateForm!: FormGroup;
  visible = false;
  submit = true;
  drawerTitle: string = '';
  uomForm!: UntypedFormGroup;
  uom_info: any = [];
  user_data: any = [];
  searchText = '';
  uomId: any;
  updateBtnDisable:boolean = true;
  isLoading : boolean = false ;
  isDisabled:boolean = false;


  

  constructor(private fb: UntypedFormBuilder,private uomService:UomService,private notification:NotificationService) { }


  // rowData = [{"sno":1,"uom_code":"KG","uom_name":"Kilo"},
  //            {"sno":2,"uom_code":"TON","uom_name":"Tons"}];

  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

  

  columnDefs = [
    { headerName: 'S.No.', field: 'sno', alignment: 'center', filter: false ,width:'100'},
    { headerName: 'UOM Code', alignment: 'left', field: 'uom_code'},
    { headerName: 'UOM Name', alignment: 'left', field: 'uom_name'}];
  
    


    ngOnInit(): void {
      this.uomFormValidators();    
      // this.user_data = sessionStorage.getItem('user_data');
      // this.user_data = JSON.parse(this.user_data);
      this.getUom();
    }

    onToolbarPreparing(e:any) {
      e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'plus',
          text: 'Add Uom',
          onClick: this.create.bind(this, 'new'),
          bindingOptions: {
            'disabled': 'isEmailButtonDisabled'
          }
        }
      });
    }

    getUom(): void {
      this.isLoading = true;
      this.uomService.getUoms().subscribe((res) => {
        this.uom_info = res;
        this.uom_info.forEach((element:any,index:any) => {
          element['sno'] = index + 1;
        })
        this.isLoading = false ;
      });
      
    }
    create(): void {
      this.isDisabled = false;
      this.submit = true;
      this.drawerTitle = 'Add Uom';
      this.visible = true;
      this.uomFormValidators();
    }
  
    edit(type: any, data: any) {
      this.submit = false;
      this.visible = true;
      this.uomId = data?.uom_id;
      
      if (type == 'edit'){
        this.isDisabled = false;
        this.drawerTitle = 'Edit Uom Details';
        this.updateBtnDisable = true;
        this.uomFormValidators();
        this.uomForm.get('uom_code')?.setValue(data?.uom_code);
        this.uomForm.get('uom_name')?.setValue(data?.uom_name);
        
      }
      if (type == 'view'){
        this.isDisabled = true;
        this.drawerTitle = 'View Uom Details';
        this.updateBtnDisable = false;
        this.uomFormValidators();
        this.uomForm.get('uom_code')?.setValue(data?.uom_code);
        this.uomForm.get('uom_name')?.setValue(data?.uom_name);
      }
      
    }

  
  
    close(): void {
      this.visible = false;
    }
  
    prepareUomPayload(data: any) {
      const payload = {
        uom_code:data.uom_code,
        uom_name:data.uom_name,
        created_by: this.user_data?.user_id,
        updated_by: this.user_data?.user_id
      }
      return payload;
    }
  
    onCreateSubmit() {
      if (this.uomForm.valid){
        this.uomService.createUom(this.prepareUomPayload(this.uomForm.value)).subscribe((res) => {
          this.visible = false;
          this.getUom();
          this.notification.createNotification("success", res?.message);
        });      
      } else {
        console.log('invalid');
        Object.values(this.uomForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
  
    prepareUpdatePayload(data: any) {
      const payload = {     
        uom_code:data.uom_code,
        uom_name:data.uom_name,
        updated_by: this.user_data?.user_id
      }
      return payload;
    }
  
    onUpdateSubmit() {
      if (this.uomForm.valid) {
        this.uomService.updateUom(this.uomId, this.prepareUpdatePayload(this.uomForm.value)).subscribe((res) => {
          this.notification.createNotification(res.status,res.message);        
          this.visible = false;
          this.getUom();
        });
      } 
      else {
          console.log('invalid')
          Object.values(this.uomForm.controls).forEach(control => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          });
        }
    }
  
    uomFormValidators(){
      this.uomForm = this.fb.group({
        uom_name: [{value:'',disabled:this.isDisabled},[Validators.required,Validators.pattern(GlobalConstants.firstLastNameRegex),Validators.minLength(3),Validators.maxLength(50)]],
        uom_code: [{value:'',disabled:this.isDisabled},[Validators.required,Validators.pattern(GlobalConstants.nameRegex),Validators.minLength(2),Validators.maxLength(50)]],
      });
    }
    
  }
  