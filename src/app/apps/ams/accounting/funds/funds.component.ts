import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
// import { NotificationService } from 'src/app/services/auth/notification.service';
// import { GlobalConstants } from 'src/app/shared/global_constants';
import { formatDate } from '@angular/common';
import { FundsService } from 'src/app/shared/moduleservices/funds.service';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { exportDataGrid } from 'devextreme/excel_exporter';
import  {Workbook}  from 'exceljs';
import { saveAs } from 'file-saver-es';
@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent implements OnInit {
  fund_info: any[] = [];
  visible = false;
  submit = true;
  drawerTitle: string = '';
  fundsForm!: UntypedFormGroup;
  searchText = '';
  user_data: any;
  fundId: any;
  dateFormat = 'dd/MM/yyyy';
  currentDate = new Date();
  editAmount: any;
  updateBtnDisable:boolean = true;
  isLoading:boolean = true;
  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  rowData = [];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private fb: UntypedFormBuilder,
    private notification: NotificationService,
    private fundService: FundsService,
  ) { }

  columnDefs = [
    { headerName: 'S.No.', width: '100',field:'sno', alignment:'left', cellTemplate:'serialNo' },
    { headerName: 'Fund Type', width: '150' ,field:'fund_type', filter: true},
    { headerName: 'Fund Description', width: '300' , filter: true, field:'fund_description'},
    { headerName: 'Transaction Mode', width: '150' , filter: true, field:'transaction_mode'},
    { headerName: 'Amount', width: '150' , filter: true, field:'fund_value',cellTemplate:'fundValue'},
    { headerName: 'Date', width: '100' , filter: true, field:'fund_released_date',cellTemplate:'dateTemplate'},
  ]


  ngOnInit(): void {
    this.fundsFormValidators();
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.getFunds();
  }

  onToolbarPreparing(e:any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add Funds',
        onClick: this.create.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

  getFunds(): void {
    this.fundService.getFunds().subscribe((res) => {
      this.rowData = res;
      this.fund_info = res;
      this.isLoading = false;
    })
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Fund Details';
    this.visible = true;
    this.fundsFormValidators();
    this.fundsForm.get('fund_type')?.setValue('state');
  }

  

  close(): void {
    this.visible = false;
  }

  prepareFundPayload(data: any) {
    const payload = {
      fund_type: data.fund_type,
      fund_description: data.fund_description,
      fund_released_date: data.fund_released_date,
      transaction_mode: data.transaction_mode,
      fund_value: data.fund_value,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }
  
  onCreateSubmit() {
    if (this.fundsForm.valid) {
      this.fundsForm.value.fund_released_date = formatDate(this.fundsForm.value.fund_released_date, 'yyyy-MM-dd hh:mm:ss', this.locale);
      this.fundService.createFund(this.prepareFundPayload(this.fundsForm.value)).subscribe((res) => {
        this.visible = false;
        this.getFunds();
        this.notification.createNotification("success", res?.message);
      });
    } else {
      Object.values(this.fundsForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  prepareUpdatePayload(data:any){
    const payload = {
      fund_type: data.fund_type,
      fund_description: data.fund_description,
      fund_released_date: data.fund_released_date,
      transaction_mode: data.transaction_mode,
      fund_value: data.fund_value,
      updated_by: this.user_data?.user_id,
      diffAmount: data.fund_value - this.editAmount
    }
    return payload;
  }

  onUpdateSubmit() {
    if (this.fundsForm.valid) {
      this.fundsForm.value.fund_released_date = formatDate(this.fundsForm.value.fund_released_date, 'yyyy-MM-dd hh:mm:ss', this.locale);
      this.fundService.updateFund(this.fundId,this.prepareUpdatePayload(this.fundsForm.value)).subscribe((res) => {
        this.notification.createNotification("success", res?.message);
        this.visible = false;
        this.getFunds();
      });
    } else {
      Object.values(this.fundsForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  fundsFormValidators() {
    this.fundsForm = this.fb.group({
      fund_type: ['', [Validators.required]],
      fund_description: ['', [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(10),
      // Validators.pattern(GlobalConstants.nameRegex)
    ]],
      fund_released_date: [this.currentDate, [Validators.required]],
      transaction_mode: ['banking', [Validators.required]],
      fund_value: ['', [Validators.required]],
    });
  }
  onExporting(e){
    let count = 1;
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('funds');
    worksheet.columns = [
      { width: 10 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 },
    ];
    exportDataGrid({
      component: e.component,
      worksheet,
      keepColumnWidths: false,
      topLeftCell: {row: 1, column:1},
      customizeCell:({gridCell, excelCell}) => {
        if(gridCell.column.dataField == 'fund_released_date'){
          if(gridCell.rowType == 'data'){
            excelCell.value = new Date(gridCell.value).toLocaleDateString()
          }
        }
        if(gridCell.column.dataField == 'sno'){
          if(gridCell.rowType == 'data'){
            excelCell.value = count;
            count++;
          }
        }
      }
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer: BlobPart) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'funds.xlsx');
    });
    });
    e.cancel = true;
  }
}
