import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MondalWorkAbstractComponent } from './mondal-work-abstract/mondal-work-abstract.component';
import { QuarryChartForHabitationComponent } from './quarry-chart-for-habitation/quarry-chart-for-habitation.component';
import { QuarryChartForRoadsComponent } from './quarry-chart-for-roads/quarry-chart-for-roads.component';
import { RoadTransferComponent } from './road-transfer/road-transfer.component';
import { TechnicalPowersOfOfficersComponent } from './technical-powers-of-officers/technical-powers-of-officers.component';

const routes: Routes = [
    { path: '', redirectTo: 'roads/road-transfer' },
    { path: 'roads/road-transfer', component: RoadTransferComponent },
    { path: 'abastract/mandal-works', component: MondalWorkAbstractComponent },
    { path: 'master/technical-powers', component: TechnicalPowersOfOfficersComponent },
    { path: 'quarry/chart-habitation', component: QuarryChartForHabitationComponent },
    { path: 'quarry/chart-roads', component: QuarryChartForRoadsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class MiscellaneousRoutingModule { }
