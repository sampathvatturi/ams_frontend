import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { DepartmentComponent } from './department/department.component';
import { WorksComponent } from './works/works.component';
import { InventoryComponent } from './inventory/inventory.component';
import { UomComponent } from './uom/uom.component';
import { DxButtonModule, DxDataGridModule,DxLoadPanelModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgAntdModule } from 'src/app/shared/common/ng-antd.module';
import { UserApprovalComponent } from './user-approval/user-approval.component';

@NgModule({
  declarations: [
    DepartmentComponent,
    WorksComponent,
    InventoryComponent,
    UomComponent,
    UserApprovalComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxLoadPanelModule,
    FormsModule,
    ReactiveFormsModule,
    NgAntdModule
  ]
})
export class MastersModule { }
