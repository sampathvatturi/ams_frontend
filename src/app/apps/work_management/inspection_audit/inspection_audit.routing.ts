import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InspectionAuditHomeComponent } from './inspection-audit-home/inspection-audit-home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home' },
    { path: 'home', component: InspectionAuditHomeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class InspectionAuditRoutingModule { }
