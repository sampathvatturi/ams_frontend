import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, PatternValidator, UntypedFormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/shared/moduleservices/department.service';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { GlobalConstants } from 'src/app/shared/common/global_constants';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {


  departments:any = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  departmentForm!: UntypedFormGroup;
  user_data: any;
  searchText = '';
  departmentId: any;
  updateBtnDisable:boolean = true;
  isLoading:boolean = false;

  columnDefs = [
    { headerName: 'S.No', field: 'sno', alignment: 'center',width:'100', filter: false},
    { headerName: 'Department Name', field: 'department_name', alignment: 'left'},
    ];


  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

  // sort = {
  //   compareStatus: (a: DataItem, b: DataItem) =>
  //     a.status.localeCompare(b.status),
  //   compareDate: (a: DataItem, b: DataItem) =>
  //     a.created_date.localeCompare(b.created_date),
  //   compareRank: (a: DataItem, b: DataItem) => a.ranking - b.ranking,
  // };

  constructor(
    private fb: UntypedFormBuilder,
    // private api: ApiService,
    private notification: NotificationService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.departmentFormValidators();
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.getDepartment();
  }

  onToolbarPreparing(e:any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add Department',
        onClick: this.create.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

  getDepartment() {
    this.isLoading = true;
    this.departmentService.getDepartments().subscribe((res) => {
      this.departments = res;
      this.departments.forEach((element:any,index:any) => {
        element['sno'] = index+1;
      })
    this.isLoading = false;
      
      
    })
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Department';
    this.visible = true;
    this.departmentFormValidators();
    this.departmentForm.get('status')?.setValue('active');
  }

  edit(type:any,data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Department Details';
    this.visible = true;
    this.departmentId = data?.department_id
    this.departmentFormValidators();
    this.departmentForm.get('department_id')?.setValue(data.department_id);
    this.departmentForm.get('department_name')?.setValue(data.department_name);
    this.departmentForm.get('ranking')?.setValue(data.ranking);
    this.departmentForm.get('status')?.setValue(data.status);
    this.departmentForm.get('created_by')?.setValue(data.created_by);
    this.departmentForm.get('updated_by')?.setValue(this.user_data.user_id);
    this.updateBtnDisable = true;
    if (type === 'view'){
      this.updateBtnDisable = false;
      this.drawerTitle = 'View Department Details';
    }
  }

  close(): void {
    this.visible = false;
  }

  prepareDepartmentPayload(data: any) {
    const payload = {
      department_name: data.department_name,
      status: data.status,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onCreateSubmit() {
    if (this.departmentForm.valid) {
      this.departmentService.createDepartment(this.prepareDepartmentPayload(this.departmentForm.value)).subscribe((res) => {
        this.visible = false;
        this.getDepartment();
        this.notification.createNotification("success", res?.message);
      });
    } else {
      Object.values(this.departmentForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  prepareUpdatePayload(data: any) {
    const payload = {
      department_name: data.department_name,
      status: data.status,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }
  delete(data:any){
    // console.log(data.department_id)
    this.departmentService.deleteDepartment(data.department_id).subscribe((res) => {
      this.notification.createNotification(res.status, res?.message);
      this.getDepartment()
    })
  }

  onUpdateSubmit() {
    if (this.departmentForm.valid) {
      this.departmentService.updateDepartment(this.departmentId, this.prepareUpdatePayload(this.departmentForm.value)).subscribe((res) => {
        this.visible = false;
        this.notification.createNotification("success", res?.message);
        this.getDepartment();
      });
    } else {
      Object.values(this.departmentForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  departmentFormValidators() {
    this.departmentForm = this.fb.group({
      department_name: ['', [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(10),
      Validators.pattern(GlobalConstants.nameRegex)
      ]
      ],
      status: ['', [Validators.required]],
      department_code: [''],
    });
  }

}
