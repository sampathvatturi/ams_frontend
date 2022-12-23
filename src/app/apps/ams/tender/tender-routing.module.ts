import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignTenderComponent } from './assign-tender/assign-tender.component';
import { TenderDetailsComponent } from './tender-details/tender-details.component';
import { CreateTenderComponent } from './create-tender/create-tender.component';

const routes: Routes = [
  {path:'assign-tender', component:AssignTenderComponent},
  {path:'tender-details', component:TenderDetailsComponent},
  {path:'create-tender', component:CreateTenderComponent},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderRoutingModule { }
