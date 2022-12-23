import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlternateGoProceedingsComponent } from './alternate-go-proceedings/alternate-go-proceedings.component';
import { DropingOfMasterGoProceedingsComponent } from './droping-of-master-go-proceedings/droping-of-master-go-proceedings.component';
import { GoProceedingsComponent } from './go-proceedings/go-proceedings.component';
import { RevisedGoProceedingsComponent } from './revised-go-proceedings/revised-go-proceedings.component';
import { WorkWiseMasterComponent } from './work-wise-master/work-wise-master.component';

const routes: Routes = [
    { path: '', redirectTo: 'original' },
    { path: 'original', component: GoProceedingsComponent },
    { path: 'alternate', component: AlternateGoProceedingsComponent },
    { path: 'revised', component: RevisedGoProceedingsComponent },
    { path: 'work-master', component: WorkWiseMasterComponent },
    { path: 'droping', component: DropingOfMasterGoProceedingsComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ProceedingRoutingModule { }
