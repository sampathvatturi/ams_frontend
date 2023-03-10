import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { InventoryItemsService } from 'src/app/shared/moduleservices/inventory-items.service';
import { InvoicesService } from 'src/app/shared/moduleservices/invoices.service';
import { VendorsService } from 'src/app/shared/moduleservices/vendors.service';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import Swal from 'sweetalert2'
import * as Excel from 'exceljs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  visible = false;
  submit = true;
  drawerTitle: string = '';
  invoiceForm!: UntypedFormGroup;
  invoice_info: any = [];
  vendor_array: any = [];
  v_name: any = {};
  tender_array: any = [];
  t_name: any = {};
  inventory_array: any = [];
  updated_inventory: any;
  user_data: any = [];
  searchText = '';
  tot: any;
  updateBtnDisable: boolean = true;
  showBtn:boolean = true;
  readOnly: boolean = false;

  // globalConstants = GlobalConstants;
  inventoryDetailsArray: any = [];
  files = [];
  baseUrl = environment.apiUrl;
  uploadUrl = this.baseUrl + '/upload/uploadFiles';
  getUploadedFIlesUrl = this.baseUrl + '/upload/getUploadedFiles/';
  invoiceId: any;
  isLoading: boolean = true;
  isDisabled:boolean = false;
  uploadDisabled:boolean = false;
  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

  columnDefs = [
    { headerName: 'Invoice Number', field: 'invoice_number', alignment: 'center', filter: false, width: 150 },
    { headerName: 'Vendor', field: 'vendor_name', alignment: 'center', width: 175 },
    { headerName: 'Date', field: 'created_date', alignment: 'center', width: 125, cellTemplate: 'endDate' },
    { headerName: 'Amount', field: 'amount', alignment: 'center', width: 175, cellTemplate: 'Amt' },
    { headerName: 'Tax amount', field: 'tax', alignment: 'center', width: 175, cellTemplate: 'taxAmt' },
    { headerName: 'Total', field: 'grand_total', alignment: 'center', width: 175, cellTemplate: 'grandTotal' },
    { headerName: 'Remarks', field: 'remarks', alignment: 'center', width: 175 },
    { headerName: 'Status', field: 'status', alignment: 'center', width: 100, cellTemplate: 'invoiceStatus'},
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private notification: NotificationService,
    private invoiceService: InvoicesService,
    private vendors: VendorsService,
    private inventory: InventoryItemsService,
    private msg: NzMessageService,
    public router: Router,
  ) { }

  ngOnInit(): void {    
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);  
    this.isLoading = true;
    this.invoiceFormValidators();
    this.getVendors();
    this.getInvoices(); 
  }
  getInvoices(): void {
    this.invoiceService.getInvoices().subscribe((res) => {
      this.invoice_info = res;
      this.isLoading = false;
      if(this.user_data?.vendor_id){        
        this.invoice_info = this.invoice_info.filter((item) => (item.vendor_id ===this.user_data?.vendor_id));
      }
    })
  }
  getVendors(): void {
    this.vendors.getVendors().subscribe((res) => {
      this.vendor_array = res;
      for (let x of this.vendor_array) {
        this.v_name[x.vendor_id] = x.vendor_name;
      }
    });
  }
  getInventory(): void {
    this.inventory.getInventoryItems().subscribe(res => {
      this.inventory_array = res;
      this.updated_inventory = [...res];
    })
  }
  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add Invoice',
        onClick: this.create.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }
  viewInvoice(id: any): void{
    const urlPath = 'internal/ams/view-invoice/' + id;    
    console.log("Invoice Id", id, urlPath);
    this.router.navigateByUrl(urlPath);  
  }
  view(type: any, data: any) {
    console.log(data.inventory_details);
    let inv_D = data.inventory_details;
    this.readOnly = true
    this.isDisabled = true;
    this.uploadDisabled = true;
    this.showBtn = false
    this.submit = false;
    this.drawerTitle = 'View Invoice details';
    this.visible = true;
    this.files = [];
    this.invoiceFormValidators();
    this.invoiceId = data.invoice_id
    this.invoiceForm.get('vendor_id')?.setValue(data.vendor_id.toString());
    this.invoiceForm.get('remarks')?.setValue(data.remarks);
    this.invoiceForm.get('invoice_number')?.setValue(data.invoice_number);
    this.invoiceForm.get('status')?.setValue(data.status);
    this.invoiceForm.get('amount')?.setValue(data.amount);
    this.invoiceForm.get('tax')?.setValue(data.tax);
    this.invoiceForm.get('grand_total')?.setValue(data.grand_total);
    this.invoiceForm.get('updated_by')?.setValue(this.user_data.user_id);
    this.invoiceForm.get('inventory_details')?.patchValue(data.inventory_details);
    for(let i = 1; i < inv_D.length;i++){
      this.inventory_details.push(this.fb.group({
        item: [inv_D[i].item],
        quantity: [inv_D[i].quantity],
        uom: [inv_D[i].uom],
        price: [inv_D[i].price],
        taxPercent: [inv_D[i].taxPercent],
        amt: [inv_D[i].amt],
        taxAmt: [inv_D[i].taxAmt],
        total: [inv_D[i].total],
      }));
    }
    console.log(this.invoiceForm.value.inventory_details);
    if (data.attachments != null && data.attachments != '') {
      var fileNamesArray = data.attachments.split(',');
      if (fileNamesArray.length > 0) {
        fileNamesArray.forEach((element: any) => {
          this.files.push({ name: element, url: this.getUploadedFIlesUrl + element });
        });
      }
    }
    this.updateBtnDisable = false;
  }
 
  create(): void {
    this.showBtn = true;
    this.updateBtnDisable = true;
    this.submit = true;
    this.isDisabled = false;
    this.uploadDisabled = false;
    this.drawerTitle = 'Add New Invoice';
    this.visible = true;
    this.files = [];
    this.invoiceFormValidators();
    this.invoiceForm.get('invoice_number')?.setValue(this.getInvoiceNumber());
    // this.invoiceForm.get('invoice_number')?.setValue(Math.floor(Math.random() * 100000));
    this.invoiceForm.get('status')?.setValue('open');
    this.invoiceForm.get('created_by')?.setValue(this.user_data.user_id);
    this.invoiceForm.get('updated_by')?.setValue(this.user_data.user_id);
    this.invoiceForm.get('grand_total')?.setValue(0);
    this.invoiceForm.get('amount')?.setValue(0);
    this.invoiceForm.get('tax')?.setValue(0);
    if(this.user_data?.vendor_id) {   
      console.log("this.currentVendorId", this.user_data?.vendor_id);
      this.isDisabled = true;
      this.invoiceForm.get('vendor_id')?.setValue(this.user_data?.vendor_id.toString());
      // this.invoiceForm.get('vendor_id').disable();
    }   
  }

  close(): void {
    this.visible = false;
    this.updated_inventory = [];
    this.updated_inventory = [...this.inventory_array];
  }
  onSubmit() {
    if (this.itemRepeat()) return this.notification.createNotification('error', 'Duplicate Items');
    if (this.invoiceForm.valid) {
      var fileNames: any[] = [];
      this.files.forEach(element => {
        fileNames.push(element.name);
      });
      this.invoiceForm.value.attachments = fileNames.toString();
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(res => {
        this.notification.createNotification(res.status, res.message);
        if (res.status === 'success') {
          this.visible = false;
          this.getInvoices();
        }
      });
    } else {
      Object.values(this.invoiceForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  onUpdate() {
    if (this.itemRepeat()) return this.notification.createNotification('error', 'Duplicate Items');
    if (this.invoiceForm.valid) {
      var fileNames: any[] = [];
      this.files.forEach(element => {
        fileNames.push(element.name);
      });
      this.invoiceForm.value.attachments = fileNames.toString();
      this.invoiceService.updateInvoice(this.invoiceId, this.invoiceForm.value).subscribe((res) => {
        if (res.status === 'success') {
          this.notification.createNotification(res.status, res.message);
          this.visible = false;
          this.invoiceService.getInvoices().subscribe((res) => (this.invoice_info = res));
        } else {
          this.notification.createNotification(res.status, res.message);
        }
      });
    }
    else {

      Object.values(this.invoiceForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  invoiceFormValidators() {
    this.invoiceForm = this.fb.group({
      vendor_id: [{value:'', disabled:this.isDisabled}, [Validators.required]],
      invoice_number: [''],
      status: ['open', [Validators.required]],
      remarks: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      amount: ['', [Validators.required]],
      inventory_details: this.fb.array([
        this.fb.group({
          item: ['', [Validators.required]],
          quantity: [null, [Validators.required]],
          uom: [null, [Validators.required]],
          price: [null, [Validators.required]],
          taxPercent: [null, [Validators.required]],
          amt: [0],
          taxAmt: [0],
          total: [0],
        })
      ]),
      tax: ['', [Validators.required]],
      grand_total: ['', [Validators.required]],
      // attachments: [''],
      created_by: [''],
      updated_by: [''],
    });
  }
  itemRepeat() {
    let itemArr: any = [];
    let result = false
    this.inventory_details.value.forEach((elem: any) => {
      itemArr.push(elem.item);
    });
    itemArr.forEach((elem: any) => {
      let count = 0;
      for (let i = 0; i < itemArr.length; i++) {
        if (elem == itemArr[i]) { count++ }
        if (count > 1) {
          result = true;
          break;
        }
      }
    })
    return result;
  }

  //dynamic form fields
  get inventory_details() {
    return this.invoiceForm.get("inventory_details") as UntypedFormArray
  }
  addInvertory() {
    if (this.itemRepeat()) return this.notification.createNotification('error', 'Duplicate Items');
    if (this.inventory_details.valid) {
      this.inventory_details.push(this.fb.group({
        item: ['', [Validators.required]],
        quantity: [null, [Validators.required]],
        uom: [null, [Validators.required]],
        price: [null, [Validators.required]],
        taxPercent: [null, [Validators.required]],
        amt: [0],
        taxAmt: [0],
        total: [0],
      }));
    } else {
      this.notification.createNotification('error', 'Fill all the fields');
    }
  }
  removeInventory(i: any) {
    this.inventory_details.removeAt(i);
    let totalTax = 0;
    let totalAmt = 0;
    for (let inv of this.invoiceForm.value.inventory_details) {
      totalTax += inv.taxAmt;
      totalAmt += inv.amt
    }
    this.invoiceForm.get('tax')?.setValue(totalTax);
    this.invoiceForm.get('amount')?.setValue(totalAmt);
    this.tot = Number(this.invoiceForm.value.amount) + Number(this.invoiceForm.value.tax);
    this.invoiceForm.get('grand_total')?.setValue(this.tot);
  }
  change(i: any) {
    this.inventory_details.value[i].amt = this.inventory_details.value[i].quantity * this.inventory_details.value[i].price;
    this.inventory_details.patchValue(this.setindex(i, { amt: this.inventory_details.value[i].amt }));

    this.inventory_details.value[i].taxAmt = this.inventory_details.value[i].amt * this.inventory_details.value[i].taxPercent / 100;
    this.inventory_details.patchValue(this.setindex(i, { taxAmt: this.inventory_details.value[i].taxAmt }));

    this.inventory_details.value[i].total = this.inventory_details.value[i].amt + this.inventory_details.value[i].taxAmt;
    this.inventory_details.patchValue(this.setindex(i, { total: this.inventory_details.value[i].total }));
    let totalTax = 0;
    let totalAmt = 0;
    for (let i of this.invoiceForm.value.inventory_details) {
      totalTax += i.taxAmt;
      totalAmt += i.amt
    }
    this.invoiceForm.get('tax')?.setValue(totalTax);
    this.invoiceForm.get('amount')?.setValue(totalAmt);
    this.tot = Number(this.invoiceForm.value.amount) + Number(this.invoiceForm.value.tax);
    this.invoiceForm.get('grand_total')?.setValue(this.tot);
  }
  
  setindex(i: any, data: any) {
    let arr = [];
    arr[i] = data;
    return arr
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

  cancelInvoice(type: any, data: any) {
    let reason;
    Swal.fire({
      title: data.invoice_number,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Close',
      input: 'text',
      inputPlaceholder: 'Reason',
      inputValue: reason,
      text: 'Are you sure you want to cancel this Invoice ?',
      inputValidator: (value) => {
        if (!value) {
          return 'Please Mention the Reason'
        }
      }
    }).then((result) => {
      let postdataObj={
        cancel_reason:result.value
      }
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.invoiceService.cancelInvoicesById(data.invoice_id,postdataObj).subscribe(res =>{
          if(res.status == 'success'){
            Swal.fire(res.message, '','success')
             this.getInvoices();
          }else{
            Swal.fire(res.message, '','error')
          }
        })
      }
    })
  }

  getInvoiceNumber(){
    let lastInvNum;
    let newInvNum;
    let year;
    var date_ob = new Date();
    var curr_year = date_ob.getFullYear();
    lastInvNum = this.invoice_info[this.invoice_info.length - 1].invoice_number;
    year = lastInvNum.substring(3, 7);
    if(year<curr_year && (curr_year-parseInt(year)===1)){
      year = parseInt(year)+1;
    }
    newInvNum  = lastInvNum.substring(0, 3) +year+ (parseInt(lastInvNum.substring(7)) + 1).toString().padStart(4, "0");
    return newInvNum;
  }
  
}
