import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AggrementComponent } from './aggrement/aggrement.component';
import { EoatComponent } from './eoat/eoat.component';
import { LoaComponent } from './loa/loa.component';
import { SupplementaryAggrementComponent } from './supplementary-aggrement/supplementary-aggrement.component';

const routes: Routes = [
    { path: '', redirectTo: 'loa' },
    { path: 'loa', component: LoaComponent },
    { path: 'signing', component: AggrementComponent },
    { path: 'supplementary', component: SupplementaryAggrementComponent },
    { path: 'eoat', component: EoatComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AggrementRoutingModule { }
