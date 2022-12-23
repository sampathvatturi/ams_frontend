import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultDashboardComponent } from './default/default-dashboard.component';


const routes: Routes = [
    {
        path: '',
        component: DefaultDashboardComponent,
        data: {
            title: 'State Dashboard ',
            headerDisplay: "none"
        }
    },
    {
        path: 'state-dashboard',
        component: DefaultDashboardComponent,
        data: {
            title: 'State Dashboard ',
            headerDisplay: "none"
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
