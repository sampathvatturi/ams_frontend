import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpDocsRoutingModule } from './help-docs-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { DxDataGridModule,DxBulletModule,DxTemplateModule, DxButtonModule, DxNumberBoxModule,
  DxCheckBoxModule, DxSelectBoxModule, DxTabPanelModule, DxChartModule, DxPieChartModule,DxTabsModule,DxLoadPanelModule, DxListModule, DxDiagramModule} from 'devextreme-angular';
// import { DxDataGridModule, DxBulletModule, DxTemplateModule } from 'devextreme-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
// import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HelpDocumentsComponent } from './help-documents/help-documents.component';
import { HelpFAQComponent } from './help-faq/help-faq.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@NgModule({
  declarations: [ HelpDocumentsComponent,  HelpFAQComponent],
  imports: [
    CommonModule,
    HelpDocsRoutingModule,
    Ng2SearchPipeModule,NzCollapseModule,
    // --  DXmodules -- //
    DxDataGridModule,DxBulletModule,DxTemplateModule,DxButtonModule,
    DxNumberBoxModule,DxChartModule,DxSelectBoxModule,DxCheckBoxModule,
    DxTabPanelModule,DxPieChartModule,DxTabsModule,DxLoadPanelModule,
    NzEmptyModule,NzBreadCrumbModule,
    SharedModule,
     // -- NZModules --//
     NzIconModule,
     NzButtonModule,NzCardModule,NzAvatarModule,NzRateModule,NzBadgeModule,
     NzProgressModule,NzRadioModule,NzTableModule,NzDropDownModule,NzTimelineModule,NzTabsModule,
     NzTagModule,NzListModule,NzCalendarModule,NzToolTipModule,NzFormModule,NzModalModule,
     NzSelectModule,NzUploadModule,NzInputModule,NzPaginationModule,NzDatePickerModule,
     NzCheckboxModule,NzMessageModule,NzLayoutModule, NzGridModule, NzDividerModule, 
   
  ]
})
export class HelpDocsModule { }
