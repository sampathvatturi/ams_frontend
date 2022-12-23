import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpConfigInterceptor } from 'src/app/providers/http/http.interceptor';
import { DashboardRoutingModule } from './dashboard.routing';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CategoryDashboardComponent } from './category-dashboard/category-dashboard.component';
import { StateDashboardComponent } from './state-dashboard/state-dashboard.component';
import { DistrictDashboardComponent } from './district-dashboard/district-dashboard.component';
import { PendingActionDashboardComponent } from './pending-action-dashboard/pending-action-dashboard.component';


@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        NzGridModule 
    ],
    declarations: [
        CategoryDashboardComponent,
        StateDashboardComponent,
        DistrictDashboardComponent,
        PendingActionDashboardComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    ]
}) 

export class DashboardModule {}