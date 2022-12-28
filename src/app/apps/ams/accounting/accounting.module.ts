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


@NgModule({
  declarations: [
    FundsComponent,
    AccountsComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    AccountingRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgAntdModule,
    DxLoadPanelModule
  ]
})
export class AccountingModule { }
