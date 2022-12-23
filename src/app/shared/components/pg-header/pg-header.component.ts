import { Component,Input, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'pg-header',
  templateUrl: './pg-header.component.html',
  styleUrls: ['./pg-header.component.css']
})
export class PgHeaderComponent implements OnInit {
  @Input('title') title: any;
  @Input('sbtitle') sbtitle: any;
  @Input('bckbtn') bckbtn:string = "true";
  @Input('ticon') ticon:string ='file';
  @Input('bckurl') bckurl:string="/"
  constructor(private location: Location) { }

  ngOnInit() {


  }

  goBack(){
    this.location.back();
   }
}
