import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'master-data',  loadChildren: () => import('./master_data_mng/master.data.module').then(m => m.MasterDataMngmntModule) },
    { path: 'dashboard',  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'tickets',  loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketModule) },
    { path: 'grants',  loadChildren: () => import('./grant/grant.module').then(m => m.GrantModule) },
    { path: 'proposals',  loadChildren: () => import('./proposals/proposals.module').then(m => m.ProposalsModule) },
    { path: 'proceedings',  loadChildren: () => import('./proceedings/proceedings.module').then(m => m.ProceedingModule) },
    { path: 'admin-sanction',  loadChildren: () => import('./admin_sanctions/admin_sanction.module').then(m => m.AdminSanctionModule) },
    { path: 'tech-sanction',  loadChildren: () => import('./technical_sanction/technical_sanction.module').then(m => m.TechnicalSanctionModule) },
    { path: 'tendering',  loadChildren: () => import('./tendering/tendering.module').then(m => m.TenderingModule) },
    { path: 'aggrement',  loadChildren: () => import('./aggrement/aggrement.module').then(m => m.AggrementModule) },
    { path: 'contractors',  loadChildren: () => import('./contractors_management/contractors_management.module').then(m => m.ContractorsManagementModule) },
    { path: 'measurement',  loadChildren: () => import('./work_measurement/work_measurement.module').then(m => m.WorkMeasurementModule) },
    { path: 'cases',  loadChildren: () => import('./cases_and_clearance/cases_and_clearance.module').then(m => m.CasesAndClearanceModule) },
    { path: 'completion',  loadChildren: () => import('./completion/completion.module').then(m => m.CompletionModule) },
    { path: 'inspection',  loadChildren: () => import('./inspection_audit/inspection_audit.module').then(m => m.InspectionAuditModule) },
    { path: 'payments',  loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule) },
    { path: 'miscellaneous',  loadChildren: () => import('./miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule) },
    { path: 'bulk-load',  loadChildren: () => import('./bulk_uploads/bulk_uploads.module').then(m => m.BulkUploadModule) },
    { path: 'vendor',  loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule) }, 

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WorkMangmntRoutingModule { }
