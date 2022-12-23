import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BridgeDesignComponent } from './bridge-design/bridge-design.component';
import { TechnicalSanctionComponent } from './technical-sanction/technical-sanction.component';
import { WorkEngineerAllotmentComponent } from './work-engineer-allotment/work-engineer-allotment.component';

const routes: Routes = [
    { path: '', redirectTo: 'original' },
    { path: 'original', component: TechnicalSanctionComponent },
    { path: 'allotment', component: WorkEngineerAllotmentComponent },
    { path: 'bridge-design', component: BridgeDesignComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class TechnicalSanctionRoutingModule { }
