import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpConfigInterceptor } from 'src/app/providers/http/http.interceptor';
import { MasterDataRoutingModule } from './master.data.routing';



@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        MasterDataRoutingModule
       
    ],
    declarations: [
      
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    ]
}) 

export class MasterDataMngmntModule {}