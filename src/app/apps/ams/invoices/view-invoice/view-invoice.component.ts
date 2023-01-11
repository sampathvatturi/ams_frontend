import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { InvoicesService } from 'src/app/shared/moduleservices/invoices.service';
import { VendorsService } from 'src/app/shared/moduleservices/vendors.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {

  currentInvoiceId: any;
  invoiceData: any = {
    invoice_number: '',
    vendor_name: '',
    remarks: '',
    attachments: '',
    inventory_details: [],
    amount: '',
    tax: '',
    grand_total: ''
  };
  isLoading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private notification: NotificationService,
    private invoiceService: InvoicesService,
    private vendors: VendorsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentInvoiceId = this.route.snapshot.paramMap.get('invoiceId');
    console.log("currentInvoiceId :: ", this.currentInvoiceId);
    this.getInvoiceDetails();
  }

  getInvoiceDetails(): void {
    this.invoiceService.getInvoicesById(this.currentInvoiceId).subscribe((res) => {
      if (res?.length > 0) {
        this.invoiceData = {
          invoice_number: res[0].invoice_number,
          vendor_name: res[0].vendor_name,
          remarks: res[0].remarks,
          attachments: res[0].attachments,
          inventory_details: res[0].inventory_details,
          amount: res[0].amount,
          tax: res[0].tax,
          grand_total: res[0].grand_total
        }
      }
      this.isLoading = false;
    });
  }
  back(){
    console.log('back');
    this.router.navigateByUrl('internal/ams/invoices')
  }
}
