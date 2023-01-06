import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { Expendituresservice } from 'src/app/shared/moduleservices/expenditures.service';

@Component({
  selector: 'app-view-expenditure',
  templateUrl: './view-expenditure.component.html',
  styleUrls: ['./view-expenditure.component.css']
})
export class ViewExpenditureComponent implements OnInit {

  currentExpId: any;
  vendorData: any[]=[];

  constructor(
    private route: ActivatedRoute,
    private notification: NotificationService,
    private expendituresservice: Expendituresservice,
  ) { }

  ngOnInit(): void {
    this.currentExpId = this.route.snapshot.paramMap.get('expId');
    console.log("currentExpId :: ", this.currentExpId);
    this.getVendorDetails();
  }

  getVendorDetails(): void {
    this.expendituresservice.getExpenseById(this.currentExpId).subscribe((res) => {
      if(res?.length > 0){        
        this.vendorData = res;
      }
    });
  }

}
