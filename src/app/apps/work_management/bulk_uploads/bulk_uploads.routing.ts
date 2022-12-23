import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BulkUploadHomeComponent } from './bulk-upload-home/bulk-upload-home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home' },
    { path: 'home', component: BulkUploadHomeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class BulkUploadRoutingModule { }
