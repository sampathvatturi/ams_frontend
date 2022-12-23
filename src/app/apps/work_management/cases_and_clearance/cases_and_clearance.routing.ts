import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArbitorationCaseComponent } from './arbitoration-case/arbitoration-case.component';
import { CourtCasesComponent } from './court-cases/court-cases.component';
import { DeviationsComponent } from './deviations/deviations.component';
import { ForestClearanceComponent } from './forest-clearance/forest-clearance.component';
import { VigEnforcementComponent } from './vig-enforcement/vig-enforcement.component';

const routes: Routes = [
    { path: '', redirectTo: 'clearance/forest' },
    { path: 'clearance/forest', component: ForestClearanceComponent },
    { path: 'court-cases', component: CourtCasesComponent },
    { path: 'vig-enforcement', component: VigEnforcementComponent },
    { path: 'arbitration-cases', component: ArbitorationCaseComponent },
    { path: 'cr-deviations', component: DeviationsComponent },
 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CasesAndClearanceRoutingModule { }
