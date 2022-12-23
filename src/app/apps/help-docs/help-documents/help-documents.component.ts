import { Component, OnInit } from '@angular/core';
import { AppsService } from 'src/app/shared/services/apps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-documents',
  templateUrl: './help-documents.component.html',
  styleUrls: ['./help-documents.component.scss']
})
export class HelpDocumentsComponent implements OnInit {
  
  constructor(public apiSrv: AppsService, public router: Router) { }

  ngOnInit() {
  }
}
