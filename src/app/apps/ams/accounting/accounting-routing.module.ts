import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { CashAdjustmentComponent } from './cash-adjustment/cash-adjustment.component';
import { FundsComponent } from './funds/funds.component';
import { TrailBalanceComponent } from './trail-balance/trail-balance.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {path:'accounts', component:AccountsComponent},
  {path:'funds', component:FundsComponent},
  {path:'transactions', component:TransactionsComponent},
  {path:'cash-adjustment', component:CashAdjustmentComponent},
  {path:'trail-balance', component:TrailBalanceComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
