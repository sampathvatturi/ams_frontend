import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/shared/moduleservices/department.service';
import { UserService } from 'src/app/shared/moduleservices/user.service';

@Component({
  selector: 'app-user-approval',
  templateUrl: './user-approval.component.html',
  styleUrls: ['./user-approval.component.scss']
})
export class UserApprovalComponent implements OnInit {
  data:any = [ ];
  groupedData={};
  Object = Object;
  payload = [];

  constructor(
    private userService: UserService,
    private deptService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.userService.getAllUsers().subscribe((res:any) => {
      this.data = res.filter(elem => elem.department_id != null);
  this.groupedData = this.groupBy(this.data, 'department_id');
	console.log(this.groupedData);

    })
  }
  // getDeptName(id){
  //   this.deptService.getDepartmentById(id).subscribe(res =>{
  //     console.log(res);
  //   })
  // }
  groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  selected(item){
    let count = 0;
    let itemIndex:number;
    this.payload.forEach((elem:any,index:any) => {
      if(elem.department_name === item) {
        count++;
        itemIndex = index;
      }
    })
    if(count === 0) this.payload.push({
      reason:'',
      status:'pending',
      department_name: item
    })
    if(count > 0) this.payload.splice(itemIndex,1);
  }
  submit(){
    console.log(this.payload);
  }
}
