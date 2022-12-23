import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sor',
  templateUrl: './sor.component.html',
  styleUrls: ['./sor.component.scss']
})
export class SorComponent implements OnInit {

  shwSidebar;
  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
  ChartData: { mnth_id: number; mnth_nm: string; Year: number; ttlFarmers: number; approvedFarmers: number; pendingFarmers: number; }[];
  stackedBarChart: any;

  columnDefs = [
    { headerName: 'Source name', field: 'boq_srce_nm', alignment: 'center' },
    { headerName: 'Description', alignment: 'left', field: 'dscn_tx' },
    { headerName: 'Start date', alignment: 'left', field: 'strt_dt' },
    { headerName: 'End date', alignment: 'left', field: 'end_dt' }
  ]

  rowData=[{"boq_srce_nm":'xxxxxx',
            "dscn_tx":'sdsd jldfh ld yfsdfj d gygf j,rys,j f sjl, fjs,yglsj syugfukyfkgul ysgkyufkgs,fs, rysgkuyfl gsruyflgtl ayfg',
            "strt_dt":"5/11/2015",
            "end_dt":"5/11/2015"
            },
            {"boq_srce_nm":'yyyyyyy',
            "dscn_tx":1234,
            "strt_dt":"5/11/2015",
            "end_dt":"5/11/2015"
            },
            {"boq_srce_nm":'zzzzz',
            "dscn_tx":1234,
            "strt_dt":"5/11/2015",
            "end_dt":"5/11/2015"
            },
            {"boq_srce_nm":'aaaaaaaaa',
            "dscn_tx":1234,
            "strt_dt":"5/11/2015",
            "end_dt":"5/11/2015"
            },
            {"boq_srce_nm":'bbbbbbbbbb',
            "dscn_tx":1234,
            "strt_dt":"5/11/2015",
            "end_dt":"5/11/2015"
            },
            {"boq_srce_nm":'cccccccc',
            "dscn_tx":1234,
            "strt_dt":"5/11/2015",
            "end_dt":"5/11/2015"
            }];

  constructor() { }

  ngOnInit(): void {
    this.permissions.insrt_in=0;
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

  openSideBar(){

  }

  
  onView(data) {
    console.log(data)

  }

}
