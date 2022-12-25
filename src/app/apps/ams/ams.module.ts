import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DxDataGridModule } from 'devextreme-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ThemeConstantService } from 'src/app/shared/services/theme-constant.service';
import { NgChartjsModule } from 'ng-chartjs';


const antdModule = [
  NzButtonModule,
  NzCardModule,
  NzAvatarModule,
  NzRateModule,
  NzBadgeModule,
  NzProgressModule,
  NzRadioModule,
  NzTableModule,
  NzDropDownModule,
  NzTimelineModule,
  NzTabsModule,
  NzTagModule,
  NzListModule,
  NzCalendarModule,
  NzToolTipModule,
  NzFormModule,
  NzModalModule,
  NzSelectModule,
  NzUploadModule,
  NzInputModule,
  NzPaginationModule,
  NzDatePickerModule,
  NzCheckboxModule,
  NzMessageModule,
  NzAnchorModule,
  DragDropModule,
  ScrollingModule,
  NzDrawerModule,
  NzDividerModule,
  NzIconModule
]

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
    ...antdModule,
    DxDataGridModule,
    NgChartjsModule
  ],
  providers: [
    ThemeConstantService,]
})
export class AmsModule { }
