import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  invoiceData: any[]=[];
  constructor(
    private route: ActivatedRoute,
    private notification: NotificationService,
    private invoiceService: InvoicesService,
    private vendors: VendorsService,
  ) { }

  ngOnInit(): void {
    this.currentInvoiceId = this.route.snapshot.paramMap.get('invoiceId');
    console.log("currentInvoiceId :: ", this.currentInvoiceId);
    this.getInvoiceDetails();
  }

  getInvoiceDetails(): void {
    this.invoiceService.getInvoicesById(this.currentInvoiceId).subscribe((res) => {
      if(res?.length > 0){        
        this.invoiceData = res;
      }
    });
  }

}
