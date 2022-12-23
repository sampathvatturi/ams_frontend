import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QcRecoveryComponent } from './qc-recovery/qc-recovery.component';
import { QualityControlInspectionComponent } from './quality-control-inspection/quality-control-inspection.component';
import { WorkMesauremenComponent } from './work-mesauremen/work-mesauremen.component';

const routes: Routes = [
    { path: '', redirectTo: 'work' },
    { path: 'work', component: WorkMesauremenComponent },
    { path: 'qc', component: QualityControlInspectionComponent },
    { path: 'recovery', component: QcRecoveryComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class WorkMeasurementRoutingModule { }
