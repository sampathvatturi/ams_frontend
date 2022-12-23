import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TcktCatgryComponent } from './tckt-catgry/tckt-catgry.component';

const routes: Routes = [
    { path: 'ticket-category',  component : TcktCatgryComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MasterDataRoutingModule { }
