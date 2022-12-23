import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrantsHomeComponent } from './grants-home/grants-home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home' },
    { path: 'home', component: GrantsHomeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class GrantRoutingModule { }
