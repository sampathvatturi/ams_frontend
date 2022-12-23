import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryDashboardComponent } from './category-dashboard/category-dashboard.component';
import { DistrictDashboardComponent } from './district-dashboard/district-dashboard.component';
import { PendingActionDashboardComponent } from './pending-action-dashboard/pending-action-dashboard.component';
import { StateDashboardComponent } from './state-dashboard/state-dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: 'state-dashboard' },
    { path: 'state-dashboard', component: StateDashboardComponent },
    { path: 'district-dashboard', component: DistrictDashboardComponent },
    { path: 'pending-action', component: PendingActionDashboardComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class DashboardRoutingModule { }
