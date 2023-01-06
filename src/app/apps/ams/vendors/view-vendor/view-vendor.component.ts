import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { InvoicesService } from 'src/app/shared/moduleservices/invoices.service';
import { VendorsService } from 'src/app/shared/moduleservices/vendors.service';

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.css']
})
export class ViewVendorComponent implements OnInit {

  currentVendorId: any;
  vendorData: any[]=[];

  constructor(
    private route: ActivatedRoute,
    private notification: NotificationService,
    private vendorsService: VendorsService,
  ) { }

  ngOnInit(): void {
    this.currentVendorId = this.route.snapshot.paramMap.get('vendorId');
    console.log("currentVendorId :: ", this.currentVendorId);
    this.getVendorDetails();
  }

  getVendorDetails(): void {
    this.vendorsService.getVendorById(this.currentVendorId).subscribe((res) => {
      if(res?.length > 0){        
        this.vendorData = res;
      }
    });
  }

}
