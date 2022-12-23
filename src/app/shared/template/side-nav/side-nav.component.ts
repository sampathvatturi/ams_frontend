import { Component } from '@angular/core';
import { ROUTES } from './side-nav-routes.config';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { AppsService } from '../../services/apps.service';
// import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../providers/api.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './side-nav.component.html'
})

export class SideNavComponent{

    public menuItems: any[];
    public menuItems2: any[]
    isFolded : boolean;
    isSideNavDark : boolean;
    isExpand : boolean;

    loader: boolean = true;
    clntDtls: any;
    // mainMenuItems = {
    //   "mainMenu": [
    //     {
    //       "title": "Dashboard",
    //       "route": "modules/dashboard",
    //       "icon": "fa-solid fa-house"
    //     },
    //     {
    //       "title": "Tender",
    //       "icon": "fa-solid fa-circle-info",
    //       "children":[
    //         {"title":"Tender Details",
    //           "route":"modules/create-tender",
    //           "icon": "fa-solid fa-file-circle-plus"
    //         },
    //         {
    //           "title":"Assign Tender",
    //           "route":"modules/assign-tender",
    //           "icon": "fa-solid fa-file-circle-exclamation"
    //         }
    //       ]
    //     },
    //     {
    //       "title": "Survey Report",
    //       "route": "modules/survey-report",
    //       "icon": "fa-solid fa-file-contract"
    //     },
    //     {
    //       "title": "Work Orders",
    //       "route": "modules/work-orders",
    //       "icon": "fa-solid fa-folder-open"
    //     },
    //     {
    //       "title": "Expenditure",
    //       "route": "modules/expenditure",
    //       "icon": "fa-solid fa-hand-holding-dollar"
    //     },
    //     {
    //       "title": "Invoices",
    //       "route": "modules/invoices",
    //       "icon": "fa-solid fa-file-invoice-dollar"
    //     },
    //     {
    //       "title": "Vendors",
    //       "route": "modules/vendors",
    //       "icon": "fa-solid fa-user-tie"
    //     },
    //     {
    //       "title": "Accouting",
    //       "icon": "fa-solid fa-building-columns",
    //       "children": [        
    //         {
    //           "title": "Funds",
    //           "route": "modules/funds",
    //           "icon": "fa-solid fa-dollar-sign"
    //         },
    //         {
    //           "title": "Accounts",
    //           "route": "modules/accounts",
    //           "icon": "fa-solid fa-calculator"
    //         },
    //         {
    //           "title": "Transactions",
    //           "route": "modules/transactions",
    //           "icon": "fa-solid fa-hands"
    //         }
    //       ]
    //     },
    //     {
    //       "title": "User Accounts",
    //       "route": "modules/user-accounts",
    //       "icon": "fa-solid fa-users"
    //     },
    //     {
    //       "title": "Approvals",
    //       "route": "modules/approvals",
    //       "icon": "fa-solid fa-thumbs-up"
    //     },
    //     {
    //       "title": "Masters",
    //       "icon": "fa-solid fa fa-cogs",
    //       "children": [        
    //         {
    //           "title": "Department",
    //           "route": "modules/department",
    //           "icon": "fa-solid fa-building"
    //         }, 
    //         {
    //           "title": "Works",
    //           "route": "modules/works",
    //           "icon": "fa-solid fa-person-digging"
    //         },
    //         {
    //           "title": "Inventory",
    //           "route": "modules/inventory-items",
    //           "icon": "fa-solid fa-warehouse"
    //         },      
    //         {
    //           "title": "UOM",
    //           "route": "modules/uom",
    //           "icon": "fa-solid fa-flask"
    //         }
    //       ]
    //     }
    //   ]
    // };
    mainMenuItems:any ;

    constructor( private themeService: ThemeConstantService,public apiSrv: AppsService, private ApiService:ApiService) {}

    ngOnInit(): void {
        // this.menuItems = ROUTES.filter(menuItem => menuItem);
        // this.menuItems = this.mainMenuItems?.mainMenu;
        this.ApiService.getCall('/menu/getMenu').subscribe(res =>{
          this.mainMenuItems = res;
          console.log(this.mainMenuItems);
        })
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
        this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
        this.clntDtls = JSON.parse(localStorage.getItem('clients'));
      //  this.gstMnuItmsLst();
    }
 
    closeMobileMenu(): void {
        if (window.innerWidth < 992) {
            this.isFolded = false;
            this.isExpand = !this.isExpand;
            this.themeService.toggleExpand(this.isExpand);
            this.themeService.toggleFold(this.isFolded);
        }
    }



  gstMnuItmsLst() {      
    this.loader = true;
    const rte = `auth2/admin/menu`;
    console.log("calling  -- gstMnuItmsLst ::"+rte)
    this.apiSrv.get(rte).subscribe((res) => {
        console.log(res)
      this.loader = false;
      if (res['status'] == 200) {
        this.menuItems2 = res['data'];

        for (let i = 0; i < this.menuItems2.length; i++) {
          if (!this.menuItems2[i].children) {
            this.menuItems2[i].children = [];
          }
          for (let j = 0; j < this.menuItems2[i].children.length; j++) {
            this.menuItems2[i].children[j]['submenu'] = [];
          }
        }
      }
      else {
       
    //     this.toastr.error( res["message"], '', {
    //      timeOut: 10000,
    //      positionClass: 'toast-top-right',
    //    });
     }

    }, err => {
      this.loader = false;
    });
  }

}
