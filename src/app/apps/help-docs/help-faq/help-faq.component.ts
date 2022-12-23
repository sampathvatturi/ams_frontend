import { Component, OnInit } from '@angular/core';
import { AppsService } from 'src/app/shared/services/apps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-faq',
  templateUrl: './help-faq.component.html',
  styleUrls: ['./help-faq.component.scss']
})
export class HelpFAQComponent implements OnInit {

  constructor(public apiSrv: AppsService, public router: Router) { }

  ngOnInit() {
  }
  
}
