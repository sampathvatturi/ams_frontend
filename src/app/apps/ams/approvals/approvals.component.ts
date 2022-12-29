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

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit {

  validateForm!: UntypedFormGroup;
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
  works_info: any = [];
  allUsersApprovedStatus: boolean = false;
  noDataShow: boolean = false;
  isLoading = false;
  departments: any =[];
  currentDeptId: any;
  currentUserName: any;

  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

  // columnDefs = [{ headerName: 'S.No.', field: 'sno', alignment: 'center', filter: false},
  //               { headerName: 'Tender Title', field: 'title', alignment: 'center'},
  //               { headerName: 'Vendor Name', field: 'vendor_name', alignment: 'center'},
  //               { headerName: 'Amount', field: 'tender_cost', alignment: 'center'},
  //               { headerName: 'Status', field: 'status', alignment: 'center'},]

  columnDefs = [
    { headerName: 'S.No.', field: 'sno', alignment: 'center', filter: false, width: 100, cellTemplate: 'snoTempelate' },
    { headerName: 'Inv No.', field: 'invoice_number', alignment: 'center', filter: false, width: 100 },
    { headerName: 'Vendor', field: 'vendor_name', alignment: 'center', width: 175 },
    { headerName: 'Date', field: 'created_date', alignment: 'center', width: 125, cellTemplate: 'createDate' },
    { headerName: 'Amount', field: 'amount', alignment: 'center', width: 175, cellTemplate: 'Amt' },
    { headerName: 'Tax', field: 'tax', alignment: 'center', width: 175, cellTemplate: 'taxAmt' },
    { headerName: 'Total', field: 'grand_total', alignment: 'center', width: 175, cellTemplate: 'grandTotal' },
    { headerName: 'Status', field: 'status', alignment: 'center', width: 175 },
  ];


  constructor(
    private fb: UntypedFormBuilder,
    private notification: NotificationService,
    private tenderService: TenderDetailsService,
    private userService: UserService,
    private works: WorksService,
    private invoicesService: InvoicesService,
    private datePipe: DatePipe,    
    private departmentService: DepartmentService
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
    this.getWorks();
    this.getVendorInvoices();
    this.getDepartments();
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

  getWorks() {
    this.works.getWorks().subscribe((res) => {
      this.works_info = res;
    })
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe((res) => {
      this.departments = res;
    })
  }

  workIdToName(id: any) {
    let arr = id.split(',');
    for (let index = 0; index < arr.length; index++) {
      this.works_info.forEach((element: any) => {
        if (element.work_id == Number(arr[index])) {
          arr[index] = element.work_name;
        }
      })

    }
    return arr.join(', ');
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
    // this.invoiceUserStatusList.filter((item: any) => (item?.status === 'Pending' || item?.status === 'Rejected'))
    this.updateInvoiceUserStatus();
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  prepareUpdatePayload() {
    this.allUsersApprovedStatus = this.invoiceUserStatusList.every((item: any) => item.status === 'Approved');
    const allUsersRejectStatus = this.invoiceUserStatusList.every((item: any) => item.status === 'Rejected');
    const mainStatus = this.invoiceUserStatusList.some((item: any) => (item?.status === 'Pending' || item?.status === 'Rejected'));
    console.log("allUsersApprovedStatus", this.allUsersApprovedStatus, allUsersRejectStatus);

    const payload = {
      invoice_user_status: this.invoiceUserStatusList,
      updated_by: this.user_data?.user_id,
      status: this.allUsersApprovedStatus ? 'paid' : allUsersRejectStatus ? 'cancel' : mainStatus ? 'open' : this.currentInvoiceData?.status
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

}
