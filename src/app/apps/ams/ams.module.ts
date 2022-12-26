import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AmsRoutingModule } from './ams-routing.module';
import { ApprovalsComponent } from './approvals/approvals.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { SurveyReportComponent } from './survey-report/survey-report.component';
import { UserAccountsComponent } from './user-accounts/user-accounts.component';
import { VendorsComponent } from './vendors/vendors.component';
import { WorkOrdersComponent } from './work-orders/work-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TenderModule } from './tender/tender.module';
import { AccountingModule } from './accounting/accounting.module';
import { MastersModule } from './masters/masters.module';
import { ThemeConstantService } from 'src/app/shared/services/theme-constant.service';
import { NgChartjsModule } from 'ng-chartjs';
import { NgAntdModule } from 'src/app/shared/common/ng-antd.module';
import { DxDataGridModule } from 'devextreme-angular';




@NgModule({
  declarations: [
    DashboardComponent,
    SurveyReportComponent,
    WorkOrdersComponent,
    ExpenditureComponent,
    InvoicesComponent,
    VendorsComponent,
    UserAccountsComponent,
    ApprovalsComponent,
  ],
  imports: [
    CommonModule,
    AmsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TenderModule,
    AccountingModule,
    MastersModule,
    DxDataGridModule,
    NgChartjsModule,
    NgAntdModule
  ],
  providers: [
    ThemeConstantService,DatePipe]
})
export class AmsModule { }
