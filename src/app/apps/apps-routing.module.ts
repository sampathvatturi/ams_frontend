import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutAppComponent } from '../layouts/layout-app/layout-app.component';

const routes: Routes = [
    { path: 'dashboard',  loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'help',  loadChildren: () => import('./help-docs/help-docs.module').then(m => m.HelpDocsModule) },
    { path: 'work-mng',  loadChildren: () => import('./work_management/work.management.module').then(m => m.WorkMangementModule) },
       
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AppsRoutingModule { }
