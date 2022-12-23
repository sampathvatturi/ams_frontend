import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReTenderingComponent } from './re-tendering/re-tendering.component';
import { TenderAllotmentComponent } from './tender-allotment/tender-allotment.component';
import { TenderIssueNoticeComponent } from './tender-issue-notice/tender-issue-notice.component';
import { TenderingComponent } from './tendering/tendering.component';

const routes: Routes = [
    { path: '', redirectTo: 'relase' },
    { path: 'notices', component: TenderIssueNoticeComponent },
    { path: 'relase', component: TenderingComponent },
    { path: 'allotment', component: TenderAllotmentComponent },
    { path: 'nth-call', component: ReTenderingComponent },
    { path: 'boq', loadChildren: () => import('./boq/boq.module').then(m => m.BoqModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class TenderingRoutingModule { }
