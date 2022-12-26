import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppsRoutingModule } from './apps-routing.module';
import { QuillModule } from 'ngx-quill';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from '../providers/http/http.interceptor';
import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { TableService } from '../shared/services/table.service';
import { AppsService } from '../shared/services/apps.service';
import { TransferService } from '../shared/services/transfer.service';
import { NgAntdModule } from '../shared/common/ng-antd.module';


@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        AppsRoutingModule,
        QuillModule.forRoot(),
        NgAntdModule
    ],
    declarations: [ ],
    providers: [
        ThemeConstantService,
        AppsService,
        TransferService,
        TableService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    ]
}) 

export class AppsModule {}