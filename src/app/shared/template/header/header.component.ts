import { Component } from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { Router, RouterModule } from '@angular/router'; 
import { AppsService } from 'src/app/shared/services/apps.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HeaderService } from 'src/app/shared/services/header.service';
import { Observable  } from 'rxjs';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent{

    searchVisible : boolean = false;
    quickViewVisible : boolean = false;
    isFolded : boolean;
    isExpand : boolean;
    clntDtls: any;
    usrDtls: any;
    setting={ header_title : "" }
    data={"short_lbl":""}
    id: string;
    folder_id$: Observable<string>;
    constructor( private themeService: ThemeConstantService, public router: Router,public apiSrv: AppsService, private notification: NzNotificationService
                                     ,private headerService: HeaderService) {
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

        this.headerService.selectedHeaderTitle.subscribe(header =>  {
            this.setting.header_title = header;
            console.log("------header selectedHeaderTitle change triggered ::"+header)
        });
        // this._headerService._headerTitleChange.subscribe(value => {
        //     console.log("Value in setup ::"+value)
        //     this.setting.header_title=value;
        // });



    }

    setHeading(){

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
        console.log("logout")
       
        this.apiSrv.get("auth2/admin/logout")
            .subscribe(res => {
                if (res['status'] == 200) {
                    localStorage.clear();
                    this.router.navigateByUrl('internal');
                } else {
                    this.notification.create( 'error','',res["message"]);
                   
                 }
            }, (err) => {
            })

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
