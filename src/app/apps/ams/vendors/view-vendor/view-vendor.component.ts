import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  vendorData: any = {
    vendor_name:'',
    status:'',
    phone_number:'',
    email:'',
    address:'',
    city:'',
    district:'',
    state:'',
    gst_num:''
  };
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private notification: NotificationService,
    private vendorsService: VendorsService,
    private router: Router
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
        this.vendorData = {
          vendor_name:res[0].vendor_name,
          status:res[0].status,
          phone_number:res[0].phone_number,
          email:res[0].email,
          address:res[0].address,
          city:res[0].city,
          district:res[0].district,
          state:res[0].state,
          gst_num:res[0].gst_num
        };
        this.isLoading = false;
      }
    });
  }
  back(){
    this.router.navigateByUrl('internal/ams/vendors')
  }

}
