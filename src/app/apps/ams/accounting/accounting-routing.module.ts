import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { FundsComponent } from './funds/funds.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {path:'accounts', component:AccountsComponent},
  {path:'funds', component:FundsComponent},
  {path:'transactions', component:TransactionsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
