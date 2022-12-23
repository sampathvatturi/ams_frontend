import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrCompletionReportComponent } from './cr-completion-report/cr-completion-report.component';

const routes: Routes = [
    { path: '', redirectTo: 'completion-report' },
    { path: 'completion-report', component: CrCompletionReportComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CompletionRoutingModule { }
