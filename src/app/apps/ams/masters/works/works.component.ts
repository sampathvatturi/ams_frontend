import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { WorksService } from 'src/app/shared/moduleservices/works.service';
import { GlobalConstants } from 'src/app/shared/common/global_constants';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})

export class WorksComponent implements OnInit {
  visible = false;
  submit = true;
  drawerTitle: string = '';
  workForm!: UntypedFormGroup;
  works_info:any = [];
  user_data:any = [];
  searchText = '';
  errTip = '';
  workId:any;
  updateBtnDisable:boolean = true;
  isLoading:boolean = false;
  pageIndex:any = 0;
  pageSize:number = 10;
  isDisabled:boolean = false;

  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

  columnDefs = [
    { headerName: 'Sl.No.', field: 'sno', alignment: 'center', filter: false,width:'100'},
    { headerName: 'Works Name', alignment: 'left', field: 'work_name' },
  ]

  constructor(
    private fb: UntypedFormBuilder,
    private notification:NotificationService,
    private workService:WorksService,
    private http:HttpClient
    ) { }

    ngOnInit(): void {
      this.worksFormValidators();
      this.user_data = sessionStorage.getItem('user_data');
      this.user_data = JSON.parse(this.user_data);
      this.getWorks();
    }
    getPage(size:any,index:any){
      let params = new HttpParams().append('page', `${index+1}`).append('length', `${size}`);
      this.http.get('http://localhost:5000/getworks',{params}).subscribe()
      console.log(size,index+1);
    }
    onToolbarPreparing(e:any) {
      e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'plus',
          text: 'Add Work',
          onClick: this.create.bind(this, 'new'),
          bindingOptions: {
            'disabled': 'isEmailButtonDisabled'
          }
        }
      });
    }

    getWorks():void{
      this.isLoading = true ;
      this.workService.getWorks().subscribe((res) =>{
        this.works_info = res;
        this.works_info.forEach((elem:any,index:any)=>{
          elem['sno']=index+1;
        })
        this.isLoading = false;
      });
    }

    create(): void {
      this.isDisabled = false;
      this.submit = true;
      this.drawerTitle = 'Add Work';
      this.visible = true;
      this.worksFormValidators();
      
    }

    

    edit(type:any,data: any) {
      this.submit = false;
      this.workId = data?.work_id;
      this.visible = true;
   
      if (type == 'edit'){
        this.isDisabled = false;
        this.drawerTitle = 'Edit Work Details';
        this.updateBtnDisable = true;
        this.worksFormValidators();
        this.workId = data?.work_id;
        this.workForm.get('work_name')?.setValue(data.work_name);
      }
      if(type == 'view'){
        this.isDisabled = true;
        this.drawerTitle = 'View Work Details';
        this.updateBtnDisable = false;
        this.worksFormValidators();
        this.workForm.get('work_name')?.setValue(data.work_name);
      }
    }

    // view(data:any){
    //   this.isDisabled = true;
    //   this.submit = false;
    //   this.drawerTitle = 'View Work Details';
    //   this.visible = true;
    //   this.workId = data?.work_id;
    //   this.worksFormValidators();
    //   this.workForm.get('work_name')?.setValue(data.work_name);
    //   this.updateBtnDisable = false;
      
    // }

    close(): void {
      this.visible = false;
      this.updateBtnDisable = true;
    }

    prepareWorksPayload(data:any){
      const payload = {
        work_name:data.work_name,
        created_by:this.user_data.user_id,
        updated_by:this.user_data?.user_id
      }
      return payload;
    }
    
    onCreateSubmit() {
      if (this.workForm.valid){
        this.workService.createWorks(this.prepareWorksPayload(this.workForm.value)).subscribe((res)=>{
            this.visible = false;
            this.getWorks();
            this.notification.createNotification("success", res?.message);
        });
      }
      else {
        console.log('invalid')
        Object.values(this.workForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }

    prepareUpdatePayload(data:any){
      const payload = {
        work_name:data.work_name,
        updated_by:this.user_data?.user_id
      }
      return payload;
    }

    onUpdateSubmit() {
      if (this.workForm.valid) {
        this.workService.updateWorks(this.workId, this.prepareUpdatePayload(this.workForm.value)).subscribe((res) => {
          this.notification.createNotification(res.status,res.message);        
          this.visible = false;
          this.getWorks();
        });
      } else {
          console.log('invalid')
          Object.values(this.workForm.controls).forEach(control => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          });
        }
    }

    worksFormValidators(){
      this.workForm = this.fb.group({
        work_name: [{value:'',disabled:this.isDisabled},[Validators.required,Validators.pattern(GlobalConstants.firstLastNameRegex),Validators.minLength(3),Validators.maxLength(50)]],
      });
    }
}
