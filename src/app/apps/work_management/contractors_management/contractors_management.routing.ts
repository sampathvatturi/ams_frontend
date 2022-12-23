import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArbitrationComponent } from './arbitration/arbitration.component';
import { BlockedContractorsComponent } from './blocked-contractors/blocked-contractors.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { DebarredComponent } from './debarred/debarred.component';

const routes: Routes = [
    { path: '', redirectTo: 'home' },
    { path: 'home', component: ContractorsComponent },
    { path: 'blocked', component: BlockedContractorsComponent },
    { path: 'debarred', component: DebarredComponent },
    { path: 'arbitration', component: ArbitrationComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ContractorsManagementRoutingModule { }
