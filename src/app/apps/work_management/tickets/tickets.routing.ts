import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsListComponent } from './tickets-list/tickets-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'list' },
    { path: 'list', component: TicketsListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class TicketRoutingModule { }
