import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillOrdersComponent } from './bill-orders/bill-orders.component';
import { EmdBgsComponent } from './emd-bgs/emd-bgs.component';
import { FinalPaymentsComponent } from './final-payments/final-payments.component';

const routes: Routes = [
    { path: '', redirectTo: 'bill-orders' },
    { path: 'bill-orders', component: BillOrdersComponent },
    { path: 'final-payments', component: FinalPaymentsComponent },
    { path: 'emd-bg', component: EmdBgsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class PaymentsRoutingModule { }
