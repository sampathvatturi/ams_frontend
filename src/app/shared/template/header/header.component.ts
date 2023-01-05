import { Component } from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { Router, RouterModule } from '@angular/router';
import { AppsService } from 'src/app/shared/services/apps.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HeaderService } from 'src/app/shared/services/header.service';
import { Observable } from 'rxjs';
import { DepartmentService } from '../../moduleservices/department.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    searchVisible: boolean = false;
    quickViewVisible: boolean = false;
    isFolded: boolean;
    isExpand: boolean;
    clntDtls: any;
    usrDtls: any;
    setting = { header_title: "" }
    data = { "short_lbl": "" }
    id: string;
    folder_id$: Observable<string>;
    user_data:any;
    name:string = '';
    first_name:string = '';
    last_name: any;
    full_name: string;
    role:any;
    department:any = [];
    user_department:any;
    constructor(private themeService: ThemeConstantService, public router: Router, public apiSrv: AppsService, private notification: NzNotificationService,private Depts:DepartmentService,
        private headerService: HeaderService) {
        this.clntDtls = JSON.parse(localStorage.getItem('clients'));
        this.usrDtls = JSON.parse(localStorage.getItem('userdata'));
        
        // this.data.short_lbl = this.usrDtls.fst_nm.substring(0, 1)+this.usrDtls.lst_nm.substring(0, 1);


        // this.changeHeader();

        // console.log("In HEADER ::"+headerService.headerTitle)
        // this.setting.header_title=headerService.headerTitle;

        // this.headerService._headerTitleChange.subscribe(value => {
        //     console.log("Value in setup ::"+value)
        //     this.setting.header_title=value;
        // });



        // this.folder_id$ = headerService.getObservable();
        // this.folder_id$.subscribe(folder_id => {
        //     console.log("--------- "+folder_id)
        //      this.id = folder_id;
        //   }
        // );

    }



    ngOnInit(): void {
        console.log("In header Init")
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => {
            this.isFolded = isFolded;
            console.log("Theeme is fold triggered")
        });
        
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);

        this.headerService.selectedHeaderTitle.subscribe(header => {
            this.setting.header_title = header;
            console.log("------header selectedHeaderTitle change triggered ::" + header)
        });

        this.Depts.getDepartments().subscribe((res) => {
            this.department = res;
            // this.department = this.department.map((current:any) =>  console.log(JSON.parse(current)))
        this.user_department = this.department.find((item: any)=> (item?.department_id === this.user_data?.department_id));
        this.user_department = this.user_department?.department_name
        })

        this.user_data = JSON.parse(sessionStorage.getItem('user_data'));
        this.first_name = this.user_data?.first_name?.slice(0, 1).toUpperCase();
        this.last_name = this.user_data?.last_name?.slice(0, 1).toUpperCase();
        this.full_name = this.user_data?.first_name + ' ' + this.user_data?.last_name ?? '';
        this.role = this.user_data?.role;
        console.log(this.user_department)
    //    console.log(this.user_data)


        // this._headerService._headerTitleChange.subscribe(value => {
        //     console.log("Value in setup ::"+value)
        //     this.setting.header_title=value;
        // });



    }

    setHeading() {

    }
    toggleFold() {
        this.isFolded = !this.isFolded;
        this.themeService.toggleFold(this.isFolded);
    }

    toggleExpand() {
        this.isFolded = false;
        this.isExpand = !this.isExpand;
        this.themeService.toggleExpand(this.isExpand);
        this.themeService.toggleFold(this.isFolded);
    }

    searchToggle(): void {
        this.searchVisible = !this.searchVisible;
    }

    quickViewToggle(): void {
        this.quickViewVisible = !this.quickViewVisible;
    }
    editprfl() {
        // this.router.navigate([`internal/settings`]);
        this.router.navigateByUrl('internal/pages/profile')
    }
    logout() {
        // this.apiSrv.get("auth2/admin/logout")
        //     .subscribe(res => {
        //         if (res['status'] == 200) {
        //             localStorage.clear();
        //             this.router.navigateByUrl('internal');
        //         } else {
        //             this.notification.create( 'error','',res["message"]);

        //          }
        //     }, (err) => {
        //     })
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigateByUrl('/internal/auth');

    }

    notificationList = [
        {
            title: 'You received a new message',
            time: '8 min',
            icon: 'mail',
            color: 'ant-avatar-' + 'blue'
        },
        {
            title: 'New user registered',
            time: '7 hours',
            icon: 'user-add',
            color: 'ant-avatar-' + 'cyan'
        },
        {
            title: 'System Alert',
            time: '8 hours',
            icon: 'warning',
            color: 'ant-avatar-' + 'red'
        },
        {
            title: 'You have a new update',
            time: '2 days',
            icon: 'sync',
            color: 'ant-avatar-' + 'gold'
        }
    ];
}
