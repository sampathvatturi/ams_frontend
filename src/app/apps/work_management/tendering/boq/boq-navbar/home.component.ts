import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showsor;
  showmanual;
  showtemplate;
  showspecs_catlg;

  constructor() { }

  ngOnInit(): void {
  }

  sor(){
    this.showsor=true;
    this.showmanual=false;
    this.showtemplate=false;
    this.showspecs_catlg=false;
  }
  manual(){
    this.showsor=false;
    this.showmanual=true;
    this.showtemplate=false;
    this.showspecs_catlg=false;
  }

  template(){
    this.showsor=false;
    this.showmanual=false;
    this.showtemplate=true;
    this.showspecs_catlg=false;
  }

  catalog(){
  this.showsor=false;
  this.showmanual=false;
  this.showtemplate=false;
  this.showspecs_catlg=true;
  }
}
