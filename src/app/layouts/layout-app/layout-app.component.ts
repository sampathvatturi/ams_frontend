import { Component,OnInit } from '@angular/core';
import { AppsService } from 'src/app/shared/services/apps.service';
import { ThemeConstantService } from 'src/app/shared/services/theme-constant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-app',
  templateUrl: './layout-app.component.html',
  styleUrls: ['./layout-app.component.css']
})
export class LayoutAppComponent implements OnInit {
  selectedHeaderColor: string;
    empdata: any;
    isFolded: boolean;
    isSideNavDark: boolean;
    isExpand: boolean;
    url:string;
    full_screen:boolean;
    constructor(private router: Router,public apiSrv: AppsService, private themeService: ThemeConstantService) { }
    ngOnInit(): void {
        // console.log("hai");
        this.url=this.router.url;
        if(this.router.url=="/") this.full_screen=true;
        else this.full_screen=false;
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
        this.themeService.selectedHeaderColor.subscribe(color => this.selectedHeaderColor = color);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
      
      }

}
