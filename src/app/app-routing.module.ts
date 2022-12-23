import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full-layout/full-layout.component";
import { LayoutAppComponent } from './layouts/layout-app/layout-app.component';
import { AuthGuardService } from './apps/auth/auth-guard_OLD.service';
import { RouteGuardService } from './shared/services/auth/route-guard.service';




const appRoutes: Routes = [
    { path: 'internal/auth', component: FullLayoutComponent, loadChildren: () => import('./apps/auth/auth.module').then(m => m.AuthModule) },
    { path: 'internal', component: LayoutAppComponent, loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
    { path: '**', redirectTo: 'internal/auth' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules,
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}