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
    mainMenuItems:any ;
    user_data: any;
    currentUserId: any;
    currentUserRole: any;

    constructor( private themeService: ThemeConstantService,public apiSrv: AppsService, private ApiService:ApiService) {}

    ngOnInit(): void {
      this.user_data = sessionStorage.getItem('user_data');
      this.user_data = JSON.parse(this.user_data);
      this.currentUserId = this.user_data?.user_id;
      this.currentUserRole = this.user_data?.role;
      console.log("Role", this.currentUserRole);
        this.ApiService.getCall('/menu/getMenu').subscribe(res =>{
          this.mainMenuItems = res;
          this.mainMenuItems[1].children.pop() //temporary
          this.mainMenuItems.map((elem:any, index:any) => {
            if(elem.title !== "Invoices" && this.currentUserRole === 'vendor'){
              elem.status = false;
            }         
          });
          console.log("==this.mainMenuItems==",this.mainMenuItems);
        })
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
        this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
        this.clntDtls = JSON.parse(localStorage.getItem('clients'));
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
