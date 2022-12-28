import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'help', loadChildren: () => import('./help-docs/help-docs.module').then(m => m.HelpDocsModule) },
    { path: 'ams', loadChildren: () => import('../apps/ams/ams.module').then(m => m.AmsModule) },
    { path: '**', redirectTo: 'ams' },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AppsRoutingModule { }
