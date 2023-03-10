import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/shared/moduleservices/accounts.service';
import { TransactionsService } from 'src/app/shared/moduleservices/transactions.service';
import config from 'devextreme/core/config';
import  {Workbook}  from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';

config({
  defaultCurrency: 'INR'
})

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  rowData = [];
  transactions = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  transactionsForm!: UntypedFormGroup;
  transactionsFilterForm!:UntypedFormGroup;
  user_data: any;
  searchText = '';
  transId: any;
  updateBtnDisable: boolean = false;
  editAmount: any;
  accounts_info:any = [];
  currDate = new Date();
  accountName: any[] = [];
  acconts_heads:any =[];
  ref_acc_head:any =[];
  debitTotal = 0;
  creditTotal = 0 ;
  isLoading : boolean = true ;
  dataMessage = "";
  totalAmount = 0;

  constructor(
    private fb: UntypedFormBuilder,
    private transactionsservice:TransactionsService,
    private accountHeadService:AccountsService
  ) { }

  columnDefs = [
    { headerName: 'Date', width: '100', filter: false, field: 'trsxcn_date', cellTemplate: 'dateTemplate' },
    { headerName: 'Particulars', width: '600', field: 'particulars', cellTemplate: 'particularTemplate'},
    { headerName: 'Credit',field:'credit', cellTemplate: 'creditTemplate'},
    { headerName: 'Debit',field:'debit', cellTemplate: 'debitTemplate' }
  ]

  ngOnInit(): void {
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.transactionsFormValidators();
    this.transactionsFilterFormValidators();
    this.getAccounts();
    this.getTransactions();
  }

  onToolbarPreparing(e:any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add Transaction',
        onClick: this.create.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }
  
  
  getTransactions(){
    this.isLoading = true;
    this.transactionsservice.getTransactions(this.transactionsFilterForm.value).subscribe((res) => {
      // if(res.length < 0) this.dataMessage ="No Transactions Found";
      if(res.length>0) this.rowData = res;
      this.isLoading = false;
    })
    
    
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Transaction';
    this.visible = true;
    this.transactionsFormValidators();
    
  }
  getAccounts():void{
    this.accountHeadService.getAccountHeads().subscribe((res) =>{
      this.accounts_info = res;
      this.acconts_heads = [...res];
      res.forEach((data: any) => {
        this.accountName[data.id] = data.name;
      });
    });
  }
  getsum(){
    this.debitTotal = 0;
    this.creditTotal = 0;
    this.rowData.forEach((elem:any) =>{
      if(elem.type === 'debit'){this.debitTotal += Number(elem.amount)}
      if(elem.type === 'credit'){this.creditTotal += Number(elem.amount)}
    })
  }

  getcreditTotal(){
    this.getTransactions();
    if(this.rowData.length > 0){
      return '0'+this.creditTotal;
    }
  }

  getdebitTotal(){
    this.getTransactions();
    if(this.rowData.length > 0){
      return '0'+this.debitTotal;
    }
  }


  // calculateSelectedRow(options) {
  //   console.log(options)
  //   if (options.name === 'SelectedRowsSummary') {
      // if (options.summaryProcess === 'start') {
        // if(this.rowData.length > 0){
        //   options.totalValue = this.rowData.length;
        //  }
        
      // } else if (options.summaryProcess === 'calculate') {
      //   if (options.component.isRowSelected(options.value.ID)) {
      //     options.totalValue += options.value.SaleAmount;
      //   }
      // }
  //   }
  // }

 
  
  prepareCreatePayload(data: any) {
    const payload = {
      acc_head:data.acc_head,
      remarks:data.remarks,
      mode:data.mode,
      amount:data.amount,
      trsxcn_date:data.trsxcn_date,
      ref_acc_head:data.ref_acc_head,
      created_by: this.user_data?.user_id,
    }
    return payload;
  }

  onCreateSubmit() {
    if (this.transactionsForm.valid) {
      this.transactionsservice.createTransaction(this.prepareCreatePayload(this.transactionsForm.value)).subscribe( res =>{
        if(res.status === 'success'){
          this.visible = false;
        //  this.notification.createNotification(res.status, res.message);
         this.getTransactions();
        }
      });
    } else {
      Object.values(this.transactionsForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  prepareUpdatePayload(data:any){
    const payload = {
      acc_head: data.acc_head,
      ref_acc_head: data.ref_acc_head,
      remarks: data.remarks,
      mode: data.mode,
      amount: data.amount,
      updated_by: this.user_data?.user_id,
    }
    return payload;
  }


  edit(data: any) {
    this.transId = data?.trsxcn_id;
    this.editAmount = data?.amount;
    this.submit = false;
    this.drawerTitle = 'Edit Transaction';
    this.visible = true;
    this.transactionsFormValidators();
    this.transactionsForm.get('acc_head')?.setValue(data.acc_head);
    this.transactionsForm.get('ref_acc_head')?.setValue(data.ref_acc_head);
    this.transactionsForm.get('remarks')?.setValue(data.remarks);
    this.transactionsForm.get('mode')?.setValue(data.mode);
    this.transactionsForm.get('amount')?.setValue(data.amount);
  }

  onUpdateSubmit() {
    if (this.transactionsForm.valid) {
        //service
    } else {
      Object.values(this.transactionsForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  close(): void {
    this.visible = false;
  }

  transactionsFormValidators() {
    this.transactionsForm = this.fb.group({
      acc_head: ['', [Validators.required]],
      remarks: ['', [Validators.required]],
      mode: ['electricity' , [Validators.required] ],
      amount: ['', [Validators.required]],
      ref_acc_head:['',[Validators.required]]
    });
  }

  transactionsFilterFormValidators(){
    let lastYear = this.currDate.getFullYear()-1;
    let currYear = this.currDate.getFullYear();
    let startDate = lastYear+'/04/01';
    let endDate = currYear+'/12/31';
    this.transactionsFilterForm = this.fb.group({
      acc_head: ['%', [Validators.required]],
      start_date: [startDate, [Validators.required]],
      end_date: [endDate, [Validators.required]],
      type: ['%', [Validators.required]],
    })
  }
  fromTo(){
    this.ref_acc_head = [];
    this.transactionsForm.get('ref_acc_head')?.setValue('');
    this.acconts_heads.forEach((elem: any) => {
      if(elem.id != Number(this.transactionsForm.value.acc_head)){
        this.ref_acc_head.push(elem)
      }
    })
  }
  difference(options:any) {
    if (options.name === 'diff') {
      if (options.summaryProcess === 'start') {
        options.totalValue = 0;
      } else if (options.summaryProcess === 'calculate') {
        options.totalValue = options.totalValue + (options.value.credit - options.value.debit);
        console.log(options.value.credit - options.value.debit);
      }
    }
  }
  onExporting(e){
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('transactions');
    worksheet.columns = [
      { width: 15 }, { width: 30 }, { width: 15 }, { width: 15 }
    ];
    exportDataGrid({
      component: e.component,
      worksheet,
      keepColumnWidths: false,
      topLeftCell: {row: 1, column:1},
      customizeCell:({gridCell, excelCell}) => {
        if(gridCell.column.dataField == 'trsxcn_date'){
          if(gridCell.rowType == 'data'){
            excelCell.value = new Date(gridCell.value).toLocaleDateString()
          }
        }
        if(gridCell.column.dataField == 'particulars'){
          console.log(gridCell);
         if(gridCell.rowType == 'data'){
           if(gridCell.value.ref_acc_head == 0){
            excelCell.value = {
              richText:[
                { font:{bold: true}, text: this.accountName[gridCell.value.acc_head]},
                {font: {italic: true}, text: ` \r\n${gridCell.value.remarks}`}
              ]
            }
          } else{
            excelCell.value = {
              richText:[
                { font:{bold: true}, text: this.accountName[gridCell.value.ref_acc_head]},
                {font: {italic: true}, text: ` \r\n${gridCell.value.remarks}`}
              ]
            }
          }
         }
        }
      }
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer: BlobPart) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'transactions.xlsx');
    });
    });
    e.cancel = true;
  }

}
