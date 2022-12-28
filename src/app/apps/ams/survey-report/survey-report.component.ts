import { Component, OnInit } from '@angular/core';
import { TenderDetailsService } from 'src/app/shared/moduleservices/tender-details.service';
import { VendorsService } from 'src/app/shared/moduleservices/vendors.service';
import { WorksService } from 'src/app/shared/moduleservices/works.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  styleUrls: ['./survey-report.component.scss']
})
export class SurveyReportComponent implements OnInit {

  tenders: any = [];
  visible = false;
  // submit = true;
  drawerTitle: string = '';
  vendor_array: any = [];
  v_name: any = {};
  works_info: any = [];
  surveyForm!: UntypedFormGroup;
  updateBtnDisable: boolean = false;
  isLoading: boolean;

  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

  columnDefs = [
    // { headerName: 'S.No.', field: 'sno', alignment: 'center', filter: false, width: '100' },
    { headerName: 'Works', alignment: 'left', field: 'work_name' },
    { headerName: 'Tender', alignment: 'left', field: 'title' },
    { headerName: 'Tender Location', alignment: 'left', field: 'location' },
    { headerName: 'Status', alignment: 'left', field: 'status' },
  ]
  constructor(
    private tenderService: TenderDetailsService,
    private works: WorksService,
    private vendors: VendorsService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.surveyFormValidators();
    this.getWorks();

  }

  getTenders() {
    this.tenderService.getTenderDetails().subscribe((res) => {
      if (res.length > 0) {
        this.tenders = res;
        this.tenders.forEach((elem: any) => {
          // elem['sno'] = index + 1;
          elem['work_name'] = this.workIdToName(elem.work_id);
        })
        this.isLoading = false;
      } else {
        this.tenders = [];
      }
    })
  }
  // getVendors(){
  //   this.vendors.getVendors().subscribe((res) => {
  //     this.vendor_array = res;
  //     for (let x of this.vendor_array) {
  //       this.v_name[x.vendor_id] = x.vendor_name;
  //     }
  //   });
  // }
  getWorks() {
    this.works.getWorks().subscribe((res) => {
      this.works_info = res;
      this.getTenders();
    });
  }
  workIdToName(id: any) {
    let arr = id.split(',');
    for (let index = 0; index < arr.length; index++) {
      this.works_info.forEach((element: any) => {
        if (element.work_id == Number(arr[index])) {
          arr[index] = element.work_name;
        }
      })

    }
    return arr.join(', ');
  }
  edit(type: any, data: any) {
    this.drawerTitle = 'Edit Survey Report';
    this.visible = true;
    this.surveyFormValidators();
    this.surveyForm.get('status')?.setValue(data.status);
    this.updateBtnDisable = true;
    if (type === 'view') {
      this.updateBtnDisable = false;
      this.drawerTitle = 'View Survey Report';
    }
  }
  onUpdateSubmit() {
    if (this.surveyForm.valid) {
      //service
    } else {
      Object.values(this.surveyForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  close(): void {
    this.visible = false;
  }
  surveyFormValidators() {
    this.surveyForm = this.fb.group({
      status: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
}
