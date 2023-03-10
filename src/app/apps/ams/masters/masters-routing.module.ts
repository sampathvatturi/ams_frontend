import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { InventoryComponent } from './inventory/inventory.component';
import { UomComponent } from './uom/uom.component';
import { UserApprovalComponent } from './user-approval/user-approval.component';
import { WorksComponent } from './works/works.component';

const routes: Routes = [
  {path:'department', component:DepartmentComponent},
  {path:'inventory', component:InventoryComponent},
  {path:'works', component:WorksComponent},
  {path:'uom', component:UomComponent},
  {path:'user-approval', component:UserApprovalComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
