import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { VendorsService } from 'src/app/shared/moduleservices/vendors.service';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { Md5hashService } from 'src/app/shared/services/auth/md5hash.service';
import { Router } from '@angular/router';
// import { ApiService } from 'src/app/services/api.service';
// import { GlobalConstants } from 'src/app/shared/global_constants';



@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  listOfData: any[] = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  vendorForm!: UntypedFormGroup;
  vendor_info: any = [];
  vendor_array: any = [];
  user_data: any = [];
  searchText = '';
  mode: any = '';
  vendorId: any;
  updateBtnDisable: boolean = true;
  isLoading: boolean = true;
  isDisabled:boolean = false;

  constructor(private fb: UntypedFormBuilder,
    // private api: ApiService,
    private notification: NotificationService,
    private vendorService: VendorsService,
    private md5hashService: Md5hashService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.vendorFormValidators();
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.getVendors()
  }

  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

  columnDefs = [
    { headerName: 'S.No.', field: 'sno', alignment: 'center', filter: false, width: 100, cellTemplate: 'serialNo' },
    { headerName: 'Vendor Name', alignment: 'left', field: 'vendor_name', width: 175 },
    { headerName: 'Phone Number', alignment: 'left', field: 'phone_number', width: 125 },
    { headerName: 'Email', alignment: 'left', field: 'email', width: 175 },
    { headerName: 'City', alignment: 'left', field: 'city', width: 175 },
    { headerName: 'GST No', alignment: 'left', field: 'gst_num', width: 175 },
    { headerName: 'Status', alignment: 'left', field: 'status', width: 100,cellTemplate: 'StatusTemplate'},
  ]


  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add Vendor',
        onClick: this.create.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  };


  getVendors(): void {
    this.vendorService.getVendors().subscribe((res) => {
      this.vendor_info = res;
      this.isLoading = false;
    });
  }

  viewVendor(id: any): void {
    const urlPath = 'internal/ams/view-vendor/' + id;    
    console.log("Vendor Id", id, urlPath);
    this.router.navigateByUrl(urlPath); 
  }

  edit(type: any, data: any) {
    this.submit = false;
    this.visible = true;
    this.drawerTitle = 'Edit Vendor Details';
    this.mode = false;
    if (type == 'edit'){
      this.isDisabled = false;
      this.vendorId = data?.vendor_id;
      this.vendorFormValidators();
      this.vendorForm.get('vendor_name')?.setValue(data?.vendor_name);
      this.vendorForm.get('address')?.setValue(data?.address);
      this.vendorForm.get('city')?.setValue(data?.city);
      this.vendorForm.get('state')?.setValue(data?.state);
      this.vendorForm.get('district')?.setValue(data?.district);
      this.vendorForm.get('phone_number')?.setValue(data?.phone_number);
      this.vendorForm.get('gst_num')?.setValue(data?.gst_num);
      this.vendorForm.get('status')?.setValue(data?.status);
      this.vendorForm.get('user_name')?.disable();
      this.vendorForm.get('password_md5')?.disable();
      this.vendorForm.get('email')?.disable();
      this.vendorForm.get('confirm')?.disable();
      this.updateBtnDisable = true;
    }
    
    if (type === 'view') {
      this.isDisabled = true;
      this.updateBtnDisable = false;
      this.drawerTitle = 'View Vendor';
      this.vendorFormValidators();
      this.vendorForm.get('vendor_name')?.setValue(data?.vendor_name);
      this.vendorForm.get('address')?.setValue(data?.address);
      this.vendorForm.get('city')?.setValue(data?.city);
      this.vendorForm.get('state')?.setValue(data?.state);
      this.vendorForm.get('district')?.setValue(data?.district);
      this.vendorForm.get('phone_number')?.setValue(data?.phone_number);
      this.vendorForm.get('gst_num')?.setValue(data?.gst_num);
      this.vendorForm.get('status')?.setValue(data?.status);
      this.vendorForm.get('user_name')?.disable();
      this.vendorForm.get('password_md5')?.disable();
      this.vendorForm.get('email')?.disable();
      this.vendorForm.get('confirm')?.disable();

    }
  }
  create(): void {
    this.submit = true;
    this.isDisabled = false;
    this.drawerTitle = 'Add Vendor';
    this.visible = true;
    this.mode = true;
    this.vendorFormValidators();
    this.vendorForm.get('status')?.setValue('active');
  }

  close(): void {
    this.visible = false;
    this.updateBtnDisable = true;
  }

  prepareVendorPayload(data: any) {
    const payload = {
      email: data.email,
      user_name: data.user_name,
      password_md5: data.password_md5,
      phone_number: data.phone_number,
      vendor_name: data.vendor_name,
      address: data.address,
      district: data.district,
      state: data.state,
      city: data.city,
      status: data.status,
      gst_num: data.gst_num,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onCreateSubmit() {
    if (this.vendorForm.valid) {
      this.vendorForm.value.password_md5 = this.md5hashService.passwordEncrypt(this.vendorForm.value.password_md5);
      this.vendorService.createVendor(this.prepareVendorPayload(this.vendorForm.value)).subscribe((res) => {
       if (res.status === 'success') {
         this.visible = false;
         this.getVendors();
         this.notification.createNotification("success", res?.message);
       } else {
        this.notification.createNotification(res.status, res.message);
       }
      });
    } else {
      console.log('invalid');
      Object.values(this.vendorForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  prepareUpdatePayload(data: any) {
    const payload = {
      vendor_name: data.vendor_name,
      phone_number: data.phone_number,
      address: data.address,
      district: data.district,
      state: data.state,
      city: data.city,
      status: data.status,
      gst_num: data.gst_num,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onUpdateSubmit() {
    console.log(this.vendorForm);
    if (this.vendorForm.valid) {
      this.vendorService.updateVendor(this.vendorId, this.prepareUpdatePayload(this.vendorForm.value)).subscribe((res) => {
        this.notification.createNotification(res.status, res.message);
        this.visible = false;
        this.getVendors();
      });
    } else {
      console.log('invalid')
      Object.values(this.vendorForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  vendorFormValidators() {
    this.vendorForm = this.fb.group({
      vendor_name: [{value:'',disabled:this.isDisabled}, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      phone_number: [{value:'',disabled:this.isDisabled}, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address: [{value:'',disabled:this.isDisabled}, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      status: [{value:'',disabled:this.isDisabled}, [Validators.required]],
      user_name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      password_md5: ['', [Validators.required, Validators.minLength(5)]],
      confirm: ['', [this.confirmValidator]],
      email: [null, [Validators.required]],
      city: [{value:'',disabled:this.isDisabled}, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      district: [{value:'',disabled:this.isDisabled}, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      state: [{value:'',disabled:this.isDisabled}, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      gst_num: [{value:'',disabled:this.isDisabled}, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
    });
  }
  validateConfirmPassword(): void {
    setTimeout(() => this.vendorForm.controls['confirm'].updateValueAndValidity());
  }
  confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.vendorForm.controls['password_md5'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

}
