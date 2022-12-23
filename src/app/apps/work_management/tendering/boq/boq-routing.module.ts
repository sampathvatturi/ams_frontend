import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualComponent } from './manual/manual.component';
import { SorComponent } from './sor/sor.component';
import { SpecificationCatalogComponent } from './specification-catalog/specification-catalog.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  { path: '', redirectTo: 'sor' },
  { path: 'sor', component: SorComponent },
  { path: 'manual', component: ManualComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'specs_ctlg', component: SpecificationCatalogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoqRoutingModule { }
