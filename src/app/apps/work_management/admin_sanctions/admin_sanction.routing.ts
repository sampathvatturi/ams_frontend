import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlternateSanctionsComponent } from './alternate-sanctions/alternate-sanctions.component';
import { DroppingOfSanctionWorksComponent } from './dropping-of-sanction-works/dropping-of-sanction-works.component';
import { OriginalSactionsComponent } from './original-sactions/original-sactions.component';
import { RevisedSanctionsComponent } from './revised-sanctions/revised-sanctions.component';

const routes: Routes = [
    { path: '', redirectTo: 'original' },
    { path: 'original', component: OriginalSactionsComponent },
    { path: 'alternate', component: AlternateSanctionsComponent },
    { path: 'revised', component: RevisedSanctionsComponent },
    { path: 'droping', component: DroppingOfSanctionWorksComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AdminSanctionRoutingModule { }
