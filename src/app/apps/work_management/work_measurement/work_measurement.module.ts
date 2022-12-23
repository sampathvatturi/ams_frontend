import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpConfigInterceptor } from 'src/app/providers/http/http.interceptor';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';

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
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { WorkMeasurementRoutingModule } from './work_measurement.routing';
import { WorkMesauremenComponent } from './work-mesauremen/work-mesauremen.component';
import { QualityControlInspectionComponent } from './quality-control-inspection/quality-control-inspection.component';
import { QcRecoveryComponent } from './qc-recovery/qc-recovery.component';


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
    NzDrawerModule
]


@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        NzGridModule,
        ...antdModule,
        WorkMeasurementRoutingModule,
        ToastrModule.forRoot(),
        DxDataGridModule,
        DxButtonModule
    ],
    declarations: [
        
    
    WorkMesauremenComponent,
                   QualityControlInspectionComponent,
                   QcRecoveryComponent
  ],
    providers: [
        ToastrService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    ]
})

export class WorkMeasurementModule { }