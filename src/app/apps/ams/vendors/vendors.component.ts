import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { ApiService } from 'src/app/services/api.service';
// import { NotificationService } from 'src/app/services/auth/notification.service';
// import { VendorsService } from 'src/app/services/vendors.service';
// import { GlobalConstants } from 'src/app/shared/global_constants';
// import { Md5hashService } from 'src/app/services/md5hash.service';


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
  vendorForm!: FormGroup;
  vendor_info:any = [];
  vendor_array:any = [];
  user_data:any = [];
  searchText = '';
  mode:any = '';
  vendorId: any;
  updateBtnDisable:boolean = true;
  isLoading:boolean = true;

  constructor(private fb: FormBuilder,
    // private api: ApiService,
    // private notification: NotificationService,
    // private vendorService: VendorsService,
    // private md5hashService: 
    ) {}

    ngOnInit(): void {
      this.vendorFormValidators();    
      this.user_data = sessionStorage.getItem('user_data');
      this.user_data = JSON.parse(this.user_data);
      this.getVendors()
    }

    permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

    columnDefs = [
      { headerName: 'S.No.', field: 'sno', alignment: 'center', filter: false},
      { headerName: 'Vendor Name', alignment: 'left', field: 'vendor_name' },
      { headerName: 'Phone Number', alignment: 'left', field: 'phone_number' },
      { headerName: 'Email', alignment: 'left', field: 'email' },
      { headerName: 'City', alignment: 'left', field: 'city' },
      { headerName: 'GST No', alignment: 'left', field: 'gst_num' },
      { headerName: 'Status', alignment: 'left', field: 'status' },

    ]


    onToolbarPreparing(e:any) {
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
      // this.vendorService.getVendors().subscribe((res) => {
      //   this.vendor_info = res;
      //   this.isLoading = false;
      // });
      this.vendor_info = [{sno:1,vendor_name:'vendor1',phone_number:'123',email:'ven1@ven.com',city:'rjy',gst_num:'GSTIN456',status:'open'}]
    }
  
    edit(type:any,data: any) {
      this.submit = false;
      this.drawerTitle = 'Edit Vendor Details';
      this.visible = true;
      this.mode = false;
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
      if (type === 'view'){
        this.updateBtnDisable = false;
        this.drawerTitle = 'View Vendor';
      }
    }
    create(): void {
      this.submit = true;
      this.drawerTitle = 'Add Vendor';
      this.visible = true;
      this.mode = true;
      this.vendorFormValidators();
      this.vendorForm.get('status')?.setValue('active');
    }
  
    close(): void {
      this.visible = false;
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
      if (this.vendorForm.valid){
        // this.vendorForm.value.password_md5 = this.md5hashService.passwordEncrypt(this.vendorForm.value.password_md5);
        // this.vendorService.createVendor(this.prepareVendorPayload(this.vendorForm.value)).subscribe((res) => {
        //   this.visible = false;
        //   this.getVendors();
        //   this.notification.createNotification("success", res?.message);
        // });      
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
        // this.vendorService.updateVendor(this.vendorId, this.prepareUpdatePayload(this.vendorForm.value)).subscribe((res) => {
        //   this.notification.createNotification(res.status,res.message);        
        //   this.visible = false;
        //   this.getVendors();
        // });
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
  
    vendorFormValidators(){
      this.vendorForm = this.fb.group({
        vendor_name: ['',[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
        phone_number:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
        address:['',[Validators.required,Validators.minLength(3),Validators.maxLength(150)]],
        status:['',[Validators.required]],
        user_name: ['',[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
        password_md5: ['',[Validators.required ,Validators.minLength(5),Validators.maxLength(5)]],
        confirm: ['',[this.confirmValidator]],
        email: [null, [Validators.required]],
        city: ['',[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
        district: ['',[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
        state: ['',[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
        gst_num: ['',[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
      });
    }
    validateConfirmPassword(): void {
      setTimeout(() => this.vendorForm.controls['confirm'].updateValueAndValidity());
    }
    confirmValidator = (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { error: true, required: true };
      } else if (control.value !== this.vendorForm.controls['password_md5'].value) {
        return { confirm: true, error: true };
      }
      return {};
    };



  



}
