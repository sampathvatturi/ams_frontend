import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { FundsComponent } from './funds/funds.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DxButtonModule, DxDataGridModule, DxLoadPanelModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgAntdModule } from 'src/app/shared/common/ng-antd.module';
import dxLoadPanel from 'devextreme/ui/load_panel';
import { SharedModule } from 'src/app/shared/shared.module';
import { CashAdjustmentComponent } from './cash-adjustment/cash-adjustment.component';
import { TrailBalanceComponent } from './trail-balance/trail-balance.component';


@NgModule({
  declarations: [
    FundsComponent,
    AccountsComponent,
    TransactionsComponent,
    CashAdjustmentComponent,
    TrailBalanceComponent
  ],
  imports: [
    CommonModule,
    AccountingRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgAntdModule,
    DxLoadPanelModule,
    SharedModule
  ]
})
export class AccountingModule { }
