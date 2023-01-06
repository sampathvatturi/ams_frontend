import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/shared/moduleservices/accounts.service';
import { DateService } from 'src/app/shared/moduleservices/date.service';

@Component({
  selector: 'app-cash-adjustment',
  templateUrl: './cash-adjustment.component.html',
  styleUrls: ['./cash-adjustment.component.scss']
})
export class CashAdjustmentComponent implements OnInit {

  cashAdjustmentForm!: FormGroup;
  acconts_heads: any = [];

  constructor(private fb: FormBuilder, private accountHeadService: AccountsService, private dateService: DateService) { }

  ngOnInit(): void {
    this.getAccounts();
    this.cashAdjustmentFormValidators();
  }
  getTransactions() {
    let date = this.dateService.getDate(this.cashAdjustmentForm.value.trsxcn_date, 'yyyy-MM-dd');
    this.cashAdjustmentForm.get('trsxcn_date')?.setValue(date);
    console.log(this.cashAdjustmentForm.value);
  }
  getAccounts(): void {
    this.accountHeadService.getAccountHeads().subscribe((res) => {
      this.acconts_heads = [...res];
    });
  }

  cashAdjustmentFormValidators() {
    this.cashAdjustmentForm = this.fb.group({
      trsxcn_date: [null, [Validators.required]],
      type: ['', [Validators.required]],
      acc_head: ['', [Validators.required]],
      remarks: ['', [Validators.required]],
      mode: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    })
  }
}
