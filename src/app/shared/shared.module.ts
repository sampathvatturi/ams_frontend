import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ThemeConstantService } from './services/theme-constant.service';
import { HeaderService } from './services/header.service';

import { SearchPipe } from './pipes/search.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { FiltergrpPipe } from './pipes/filtergrp.pipe';

import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { InnerLoadingComponent } from './components/inner-loading/inner-loading.component';
import { PgHeaderComponent } from './components/pg-header/pg-header.component';
import { GlobalTablesearchPipe } from './pipes/global-tablesearch.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { EllipsisPipe } from './pipes/ellipsis.pipe';

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        NzIconModule,
        NzButtonModule,
        PerfectScrollbarModule,
        SearchPipe,FilterPipe,FiltergrpPipe,
        LoadingComponent,InnerLoadingComponent,PgHeaderComponent,
        NzToolTipModule,
        CurrencyPipe,
        GlobalTablesearchPipe,
        EllipsisPipe
    ],
    imports: [
        RouterModule,
        CommonModule,
        NzIconModule, 
        NzToolTipModule,
        PerfectScrollbarModule, 
        // NzButtonModule
    ],
    declarations: [
        SearchPipe,FilterPipe,FiltergrpPipe,
        MessageDialogComponent,
        LoadingComponent,
        InnerLoadingComponent,
        PgHeaderComponent,
        GlobalTablesearchPipe,
        CurrencyPipe,
        EllipsisPipe
    ],
    providers: [
        ThemeConstantService,
        HeaderService
    ],
})

export class SharedModule { }
