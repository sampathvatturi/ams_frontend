import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { Expendituresservice } from 'src/app/shared/moduleservices/expenditures.service';

@Component({
  selector: 'app-view-expenditure',
  templateUrl: './view-expenditure.component.html',
  styleUrls: ['./view-expenditure.component.css']
})
export class ViewExpenditureComponent implements OnInit {

  currentExpId: any;
  vendorData: any = {
    exp_inv_number: '',
    description: '',
    category: '',
    status: '',
    attachments: '',
    approval_user_status: [],
    amount: '',
    tax: '',
    total: ''
  };
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private notification: NotificationService,
    private expendituresservice: Expendituresservice,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentExpId = this.route.snapshot.paramMap.get('expId');
    console.log("currentExpId :: ", this.currentExpId);
    this.getVendorDetails();
  }

  getVendorDetails(): void {
    this.expendituresservice.getExpenseById(this.currentExpId).subscribe((res) => {
      if(res?.length > 0){        
        this.vendorData = {
          exp_inv_number: res[0].exp_inv_number,
          description: res[0].description,
          category: res[0].category,
          status: res[0].status,
          attachments: res[0].attachments,
          approval_user_status: res[0].approval_user_status,
          amount: res[0].amount,
          tax: res[0].tax,
          total: res[0].total
        };
        this.isLoading = false;
      }
    });
  }
  back(){
    this.router.navigateByUrl('internal/ams/expenditure')
  }

}
