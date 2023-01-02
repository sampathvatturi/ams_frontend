import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { TenderDetailsService } from 'src/app/shared/moduleservices/tender-details.service';
import { UserService } from 'src/app/shared/moduleservices/user.service';
import { WorksService } from 'src/app/shared/moduleservices/works.service';
import { TransactionDetailsService } from 'src/app/shared/moduleservices/transaction-details.service';
import { InvoicesService } from 'src/app/shared/moduleservices/invoices.service';
import { DatePipe } from '@angular/common';
import { DepartmentService } from 'src/app/shared/moduleservices/department.service';
import { AccountsService } from 'src/app/shared/moduleservices/accounts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit {

  validateForm!: UntypedFormGroup;
  approvalFilterForm!: UntypedFormGroup;
  listOfData: any[] = [];
  invoices: any[] = [];
  invoicesData: any = [];
  searchText = '';
  isVisible = false;
  users: any = [];
  userStatusList: any = [];
  currentInvoiceData: any = [];
  userStatus: any;
  user_data: any;
  currentUserId: any;
  invoiceUserStatusList: any = [];
  reason: any;
  currentInvoiceId: any;
  allUsersApprovedStatus: boolean = false;
  noDataShow: boolean = false;
  isLoading = false;
  departments: any = [];
  currentDeptId: any;
  currentUserName: any;
  accounts: any = [];
  disableOkBtn: boolean = false;
  attachments: any =[];
  baseUrl = environment.apiUrl;
  uploadUrl = this.baseUrl + '/upload/uploadFiles';
  getUploadedFIlesUrl = this.baseUrl + '/upload/getUploadedFiles/';
  status:any;
  currDate = new Date();
  columnDefs:any = [];
  approvalData:any = [];
  expenseData:any = [];


  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };


  
  


  constructor(
    private fb: UntypedFormBuilder,
    private notification: NotificationService,
    private tenderService: TenderDetailsService,
    private userService: UserService,
    private works: WorksService,
    private invoicesService: InvoicesService,
    private datePipe: DatePipe,    
    private departmentService: DepartmentService,    
    private accountHeadService: AccountsService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.currentUserId = this.user_data?.user_id;
    this.currentUserName = this.user_data?.first_name +" "+ this.user_data?.last_name;
    this.currentDeptId = this.user_data?.department_id;
    this.validateForm = this.fb.group({
      rangePicker: [null],
      type: ['tenders', [Validators.required]],
      status: ['open', [Validators.required]],
    });
    this.getUsers();
    this.getVendorInvoices();
    this.getDepartments();
    this.getAccounts();
    this.approvalsFilterFormValidators();
  }

  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      // widget: 'dxButton',
      options: {
        // icon: 'plus',
        // text: 'Add Uom',
        // onClick: this.create.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

  submit(){
    if (this.approvalFilterForm.value.type === 'expenses'){
      this.approvalData = this.expenseData;
      this.columnDefs = [
        { headerName: 'Invoice Number', field: 'invoice_number', alignment: 'center', filter: false, width: 150 },
        { headerName: 'Desctiption', field: 'description', alignment: 'center', width: 175 },
        { headerName: 'Category', field: 'category', alignment: 'center', width: 125, },
        { headerName: 'Amount', field: 'amount', alignment: 'center', width: 175, },
        { headerName: 'Tax', field: 'tax', alignment: 'center', width: 175, },
        { headerName: 'Total', field: 'total', alignment: 'center', width: 175, },
      ];
    }

    if (this.approvalFilterForm.value.type === 'invoice'){
      this.approvalData = this.invoicesData
      this.columnDefs = [
        { headerName: 'S.No.', field: 'sno', alignment: 'center', filter: false, width: 100, cellTemplate: 'snoTempelate' },
        { headerName: 'Inv No.', field: 'invoice_number', alignment: 'center', filter: false, width: 100 },
        { headerName: 'Vendor', field: 'vendor_name', alignment: 'center', width: 175 },
        { headerName: 'Date', field: 'created_date', alignment: 'center', width: 125, cellTemplate: 'createDate' },
        { headerName: 'Amount', field: 'amount', alignment: 'center', width: 175, cellTemplate: 'Amt' },
        { headerName: 'Tax', field: 'tax', alignment: 'center', width: 175, cellTemplate: 'taxAmt' },
        { headerName: 'Total', field: 'grand_total', alignment: 'center', width: 175, cellTemplate: 'grandTotal' }
      ];
    }
  }

  getVendorInvoices(action?: any): void {
    this.invoicesService.getVendorInvoices().subscribe((res) => {
      this.invoices = res;
      this.getInvoicesData();
      this.isLoading = false;
    })
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe((res) => {
      this.departments = res;
    })
  }

  getAccounts(): void {
    this.accountHeadService.getAccountHeads().subscribe((res) => {
      this.accounts = res;
    });
  }

  submitForm(): void {
    this.isLoading = true;
    console.log(this.validateForm.value);
    this.noDataShow = true;
    if (this.validateForm.value.type === 'tenders') {
      this.getInvoicesData();
    }
    this.isLoading = false;
  }

  getInvoicesData(): void {
    // this.invoicesData = this.invoices.filter((item) => item.status === 'open');
    this.invoicesData = this.invoices;
  }

  onClickApprove(data: any): void {
    console.log("==onClickApprove==", data);
    this.currentInvoiceData = data;
    this.attachments = data.attachments.split(',');
    this.userApprovalList(data);
  }

  userApprovalList(item: any): void {
    console.log(item.invoice_user_status)
    this.userStatusList = item?.invoice_user_status;
    this.currentInvoiceId = item?.invoice_id;
    console.log(this.userStatusList);
    this.departments.forEach((dept: any) => {
      this.userStatusList.map((item: any) => {
        if (dept?.department_id === item?.department_id) {
          item.department_name = dept?.department_name;
        }
        if (item.department_id === this.currentDeptId) {
          this.userStatus = item?.status;
          this.disableOkBtn = (item?.status === 'Approved' || item?.status === 'Rejected') ? true : false;
        }
      });
    });
    this.isVisible = true;
    console.log("userStatusList::", this.userStatusList);
  }

  handleOk(): void {
    console.log('Button ok clicked!', this.userStatus, this.userStatusList);
    this.invoiceUserStatusList = [];
    this.userStatusList.forEach((item: any) => {
      const obj = {
        department_id: item?.department_id,
        user_id: (item?.department_id===this.currentDeptId) ? this.currentUserId : item?.user_id ? item?.user_id : "",
        user_name: (item?.department_id===this.currentDeptId) ? this.currentUserName : item?.user_name ? item?.user_name : "",
        status: (item?.department_id === this.currentDeptId) ? this.userStatus : item?.status,
        reason: (item?.department_id === this.currentDeptId && this.userStatus === 'Rejected') ? this.reason : item?.reason ? item?.reason : "",
      }
      this.invoiceUserStatusList.push(obj);
    });
    console.log('invoiceUserStatusList :: ', this.invoiceUserStatusList);
    this.updateInvoiceUserStatus();
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  prepareUpdatePayload() {
    this.allUsersApprovedStatus = this.invoiceUserStatusList.every((item: any) => item.status === 'Approved');
    const allUsersRejectStatus = this.invoiceUserStatusList.every((item: any) => item.status === 'Rejected');
    const mainStatus = this.invoiceUserStatusList.some((item: any) => ( item?.status === 'Rejected'));
    const vendor_acct = this.accounts.find((item) => item?.ref_id === this.currentInvoiceData?.vendor_id);
    const main_acct = this.accounts.find((item) => item?.main_acc === 1);
    console.log("====allUsersApprovedStatus====", this.allUsersApprovedStatus, allUsersRejectStatus, vendor_acct, main_acct);

    const payload = {
      invoice_user_status: this.invoiceUserStatusList,
      amount: this.currentInvoiceData?.grand_total,
      vendor_id: this.currentInvoiceData?.vendor_id,
      vendor_acct_id: vendor_acct?.id,
      vendor_name: vendor_acct?.name,
      main_acct_id: main_acct?.id,
      updated_by: this.user_data?.user_id,
      status: this.allUsersApprovedStatus ? 'paid' : allUsersRejectStatus ? 'reject' : mainStatus ? 'reject' : this.currentInvoiceData?.status
    }
    return payload;
  }

  updateInvoiceUserStatus(): void {
    if (this.userStatus === 'Rejected' && !this.reason) {
      this.notification.createNotification('error', 'Please enter a reson');
    }
    else {
      this.invoicesService.updateInvoiceUserStatus(this.currentInvoiceId, this.prepareUpdatePayload()).subscribe((res) => {
        this.notification.createNotification("success", res?.message);
        this.isVisible = false;
        this.getVendorInvoices();
      })
    }
  }
  approvalsFilterFormValidators(){
    let endDate = this.currDate.toDateString();
    let month = new Date(this.currDate.getFullYear(), this.currDate.getMonth(), this.currDate.getDate() - 30);
    let startDate = month.toDateString();
    this.approvalFilterForm = this.fb.group({
      status: ['', [Validators.required]],
      start_date: [startDate, [Validators.required]],
      end_date: [endDate, [Validators.required]],
      type: ['%', [Validators.required]],
    })
  }

}
