import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/shared/moduleservices/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  visible = false;
  submit = true;
  drawerTitle: string = '';
  accountsForm!: UntypedFormGroup;
  accounts_info: any = [];
  user_data: any = [];
  searchText = '';
  accountsId: any;
  updateBtnDisable: boolean = true;
  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  rowData = [];
  isLoading:boolean;

  constructor(
    private fb: UntypedFormBuilder,
    private accountHeadService: AccountsService
  ) { }

  columnDefs = [
    { headerName: 'S.No.',field:'sno', width: '100',alignment: 'center', filter: false },
    { headerName: 'Account Name',field:'name', width: '600' , filter: true}
  ]

  ngOnInit(): void {
    this.isLoading=true;
    this.accountsFormValidators();
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.getAccounts();
  }

  onToolbarPreparing(e:any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add Account',
        onClick: this.create.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

  getAccounts(): void {
    this.accountHeadService.getAccountHeads().subscribe((res) => {
      this.accounts_info = res;
      this.accounts_info.forEach((element:any,index:any) => {
        element['sno'] = index + 1;
      })
     this.isLoading= false;
    });
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Account';
    this.visible = true;
    this.accountsFormValidators();
  }

  edit(type: any, data: any) {
    this.submit = false;
    this.drawerTitle = 'Edit Accounts';
    this.visible = true;
    this.accountsId = data?.id;
    this.accountsFormValidators();
    this.accountsForm.get('name')?.setValue(data.name);
    this.updateBtnDisable = true;
    if (type === 'view') {
      this.updateBtnDisable = false;
    }
  }

  close() {
    this.visible = false;
  }

  prepareaccountsPayload(data: any) {
    const payload = {
      name: data.name,
      created_by: this.user_data.user_id,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onCreateSubmit() {
    if (this.accountsForm.valid) {
      this.accountHeadService.createAccountHead(this.prepareaccountsPayload(this.accountsForm.value)).subscribe((res) => {
        this.visible = false;
        this.getAccounts();
        // this.notification.createNotification("success", res?.message);
      });
    }
    else {
      console.log('invalid')
      Object.values(this.accountsForm.controls).forEach(control => {
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
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onUpdateSubmit() {
    if (this.accountsForm.valid) {
      this.accountHeadService.updateAccountHead(this.accountsId, this.prepareUpdatePayload(this.accountsForm.value)).subscribe((res) => {
        // this.notification.createNotification(res.status, res.message);
        this.visible = false;
        this.getAccounts();
      });
    } else {
      console.log('invalid')
      Object.values(this.accountsForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  accountsFormValidators() {
    this.accountsForm = this.fb.group({
      name: ['', [Validators.required, 
        // Validators.pattern(GlobalConstants.accountsRegex), 
        Validators.minLength(3), Validators.maxLength(50)]]
    })
  }
}
