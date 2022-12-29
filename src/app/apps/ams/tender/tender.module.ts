import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';
import { TenderDetailsComponent } from './tender-details/tender-details.component';
import { AssignTenderComponent } from './assign-tender/assign-tender.component';
import { CreateTenderComponent } from './create-tender/create-tender.component';
import { DxButtonModule, DxDataGridModule, DxLoadPanelModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgAntdModule } from 'src/app/shared/common/ng-antd.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TenderDetailsComponent,
    AssignTenderComponent,
    CreateTenderComponent
  ],
  imports: [
    CommonModule,
    TenderRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgAntdModule,
    DxLoadPanelModule,
    SharedModule
  ]
})
export class TenderModule { }
