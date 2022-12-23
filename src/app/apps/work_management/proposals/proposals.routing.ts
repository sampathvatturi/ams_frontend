import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProposalsHomeComponent } from './proposals-home/proposals-home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home' },
    { path: 'home', component: ProposalsHomeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ProposalsRoutingModule { }
