import { Component, OnInit } from '@angular/core';
import { AppsService } from 'src/app/shared/services/apps.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-grants-home',
  templateUrl: './grants-home.component.html',
  styleUrls: ['./grants-home.component.scss']
})
export class GrantsHomeComponent implements OnInit {

  columnDefs;
  rowData;
  shwSidebar;
  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  ChartData: { mnth_id: number; mnth_nm: string; Year: number; ttlFarmers: number; approvedFarmers: number; pendingFarmers: number; }[];
  stackedBarChart: any;

  data = {
    sd_nv_hdng :''
  };
  settings = {
    shw_sd_nv: false
  };


  constructor(private apisrvc: AppsService, private toastr: ToastrService, private fb: FormBuilder, private modal: NzModalService, private router: Router) {

  }

  ngOnInit() {
    this.getBarchart();

  }

  getBarchart() {

    let tmp_data = [
      {
        "mnth_id": 1,
        "mnth_nm": "January",
        "Year": null,
        "ttlFarmers": null,
        "approvedFarmers": null,
        "pendingFarmers": null
      },
      {
        "mnth_id": 2,
        "mnth_nm": "Febuary",
        "Year": null,
        "ttlFarmers": null,
        "approvedFarmers": null,
        "pendingFarmers": null
      },
      {
        "mnth_id": 3,
        "mnth_nm": "March",
        "Year": null,
        "ttlFarmers": null,
        "approvedFarmers": null,
        "pendingFarmers": null
      },
      {
        "mnth_id": 4,
        "mnth_nm": "April",
        "Year": null,
        "ttlFarmers": null,
        "approvedFarmers": null,
        "pendingFarmers": null
      },
      {
        "mnth_id": 5,
        "mnth_nm": "May",
        "Year": null,
        "ttlFarmers": null,
        "approvedFarmers": null,
        "pendingFarmers": null
      },
      {
        "mnth_id": 6,
        "mnth_nm": "June",
        "Year": null,
        "ttlFarmers": null,
        "approvedFarmers": null,
        "pendingFarmers": null
      },
      {
        "mnth_id": 7,
        "mnth_nm": "July",
        "Year": 2022,
        "ttlFarmers": 38,
        "approvedFarmers": 35,
        "pendingFarmers": 3
      },
      {
        "mnth_id": 8,
        "mnth_nm": "August",
        "Year": null,
        "ttlFarmers": null,
        "approvedFarmers": null,
        "pendingFarmers": null
      },
      {
        "mnth_id": 9,
        "mnth_nm": "September",
        "Year": 2022,
        "ttlFarmers": 71,
        "approvedFarmers": 71,
        "pendingFarmers": 0
      },
      {
        "mnth_id": 10,
        "mnth_nm": "October",
        "Year": null,
        "ttlFarmers": null,
        "approvedFarmers": null,
        "pendingFarmers": null
      },
      {
        "mnth_id": 11,
        "mnth_nm": "November",
        "Year": null,
        "ttlFarmers": null,
        "approvedFarmers": null,
        "pendingFarmers": null
      },
      {
        "mnth_id": 12,
        "mnth_nm": "December",
        "Year": null,
        "ttlFarmers": null,
        "approvedFarmers": null,
        "pendingFarmers": null
      }
    ]
    this.ChartData = tmp_data;
    console.log(this.ChartData);
    var t1 = [];
    var t2 = [];
    var t3 = [];
    this.ChartData.forEach((item) => {
      item.pendingFarmers;
      t1.push(item.pendingFarmers);
      t2.push(item.approvedFarmers);
      t3.push(item.mnth_nm);

    })
    console.log('========================');
    console.log(t1);
    console.log(t2);


    this.stackedBarChart = new Chart('stackedBarChart', {
      type: 'bar',
      data: {
        labels: t3,
        datasets: [
          {
            label: 'Plain',
            data: t2,
            borderWidth: 2,
            backgroundColor: '#71D16B'
          },
          {
            label: 'SCP',
            data: t1,
            borderWidth: 2,
            backgroundColor: '#E47F06'
          },
          {
            label: 'TSP',
            data: t1,
            borderWidth: 2,
            backgroundColor: '#255946'
          }
        ]
      },

      options: {
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true,
          }]
        },
        legend: {
          display: true,
          position: 'bottom'
        },

        plugins: {
          datalabels: {
            formatter: (value) => {
              if (value < 0) { return ''; }
              return value;
            }
          }
        }

      }
    });

  }



  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Register Grants',
        onClick: this.openSideBar.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

  openSideBar() {
    this.settings.shw_sd_nv = true;
    this.data.sd_nv_hdng = "Grant Registration"
  }

  cancel(e) {
    this.settings.shw_sd_nv = false;
  }

  closeSideBar() {
    this.settings.shw_sd_nv = false;
  }




  openSideBarEdit(opt, data) {
  
  }

  confirm(): void {

  }
  onCellClick(opt, data) {

  }

  closeSideBarEdit(event) {


  }





}