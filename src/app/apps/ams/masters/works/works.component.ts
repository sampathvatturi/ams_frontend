import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})

export class WorksComponent implements OnInit {
  visible = false;
  submit = true;
  drawerTitle: string = '';
  workForm!: FormGroup;
  works_info:any = [];
  user_data:any = [];
  searchText = '';
  errTip = '';
  workId:any;
  updateBtnDisable:boolean = true;
  isLoading:boolean = true;

  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

  columnDefs = [
    { headerName: 'Sl.No.', field: 'sno', alignment: 'center', filter: false },
    { headerName: 'Works Name', alignment: 'left', field: 'work_name' },
  ]

  constructor(
    private fb: FormBuilder,
    // private notification:NotificationService,
    // private workService:WorksService
    ) { }

    ngOnInit(): void {
      this.worksFormValidators();
      this.user_data = sessionStorage.getItem('user_data');
      this.user_data = JSON.parse(this.user_data);
      this.getWorks();
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
      // this.workService.getWorks().subscribe((res) =>{
      //   this.works_info = res;
      //   this.isLoading = false;

      // });
      this.works_info = [
        {
          sno:1,
          work_name:'parks'
        },{
          sno:2,
          work_name:'schools'
        },
      ]
    }

    create(): void {
      this.submit = true;
      this.drawerTitle = 'Add Work';
      this.visible = true;
      this.worksFormValidators();
    }

    edit(type:any,data: any) {
      this.submit = false;
      this.drawerTitle = 'Edit Work Details';
      this.visible = true;
      this.workId = data?.work_id;
      this.worksFormValidators();
      this.workForm.get('work_name')?.setValue(data.work_name);
      this.updateBtnDisable = true;
      if (type === 'view'){
        this.updateBtnDisable = false;
        this.drawerTitle = 'View Work Details'
      }
    }

    close(): void {
      this.visible = false;
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
        // this.workService.createWorks(this.prepareWorksPayload(this.workForm.value)).subscribe((res)=>{
        //     this.visible = false;
        //     this.getWorks();
        //     this.notification.createNotification("success", res?.message);
        // });
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
        // this.workService.updateWorks(this.workId, this.prepareUpdatePayload(this.workForm.value)).subscribe((res) => {
        //   this.notification.createNotification(res.status,res.message);        
        //   this.visible = false;
        //   this.getWorks();
        // });
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
        work_name: ['',[Validators.required]],
      });
    }
}
