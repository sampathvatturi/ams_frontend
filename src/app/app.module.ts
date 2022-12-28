import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { KeyboardShortcutsModule } from "ng-keyboard-shortcuts";
import { registerLocaleData, PathLocationStrategy, LocationStrategy } from '@angular/common';
import en from '@angular/common/locales/en';

import { HttpConfigInterceptor } from './providers/http/http.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { TemplateModule } from './shared/template/template.module';

import { AuthGuardService } from './apps/auth/auth-guard_OLD.service';
import { AppsService } from './shared/services/apps.service';

import { AppComponent } from './app.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { LayoutAppComponent } from './layouts/layout-app/layout-app.component';
// import { NgChartjsModule } from 'ng-chartjs';
import { NgChartsModule } from 'ng2-charts';
import { ThemeConstantService } from './shared/services/theme-constant.service';
import { TokenInterceptorInterceptor } from './shared/services/auth/token-interceptor.interceptor';
import { NgAntdModule } from './shared/common/ng-antd.module';

const ngZorroConfig: NzConfig = {
    message: { nzMaxStack: 1 }
};
registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        LayoutAppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NzBreadCrumbModule,
        SharedModule,
        // NgChartjsModule,
        NgChartsModule,
        TemplateModule,
        KeyboardShortcutsModule.forRoot(),
        NgAntdModule
    ],
    providers: [
        AppsService, 
        ThemeConstantService, 
        {
            provide: NZ_I18N,
            useValue: en_US,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorInterceptor,
            multi: true,
          },
        { provide: NZ_CONFIG, useValue: ngZorroConfig },
        {
            provide: LocationStrategy, 
            useClass: PathLocationStrategy
        },

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
