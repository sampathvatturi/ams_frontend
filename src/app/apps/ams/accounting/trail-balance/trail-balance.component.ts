import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from 'src/app/shared/moduleservices/transactions.service';

@Component({
  selector: 'app-trail-balance',
  templateUrl: './trail-balance.component.html',
  styleUrls: ['./trail-balance.component.scss']
})
export class TrailBalanceComponent implements OnInit {

  trailBalanceFilterForm!: FormGroup;
  accounts_info:any = [];
  currDate = new Date();
  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  rowData = [];
  columnDefs = [
    { headerName: 'Particulars', width: '600', field: 'name'},
    { headerName: 'Credit',field:'credit', cellTemplate: 'creditTemplate'},
    { headerName: 'Debit',field:'debit', cellTemplate: 'debitTemplate' }
  ]

  constructor(private fb:FormBuilder, private transactionService:TransactionsService) { }

  ngOnInit(): void {
    this.trailBalanceFilterFormValidators();
    this.getTransactions();
  }
  getTransactions(){
    this.transactionService.getTrailBalance().subscribe((res:any) => {
      console.log(res);
      this.rowData = res
    })
  }

  trailBalanceFilterFormValidators(){
    let lastYear = this.currDate.getFullYear()-1;
    let currYear = this.currDate.getFullYear();
    let startDate = lastYear+'/04/01';
    let endDate = currYear+'/12/31';
    this.trailBalanceFilterForm = this.fb.group({
      acc_head: ['%', [Validators.required]],
      start_date: [startDate, [Validators.required]],
      end_date: [endDate, [Validators.required]],
      type: ['%', [Validators.required]],
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
}
