import { Component, OnInit } from '@angular/core';
import { applyleave } from 'src/app/data/applyleave';
import { EmployeeService } from '../employee.service';
import { leave } from 'src/app/data/leave';
import { myleave } from 'src/app/data/myleave';
import { LeavelistModule } from 'src/app/admin/leavelist/leavelist.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myleave',
  templateUrl: './myleave.component.html',
  styleUrls: ['./myleave.component.css']
})
export class MyleaveComponent implements OnInit {

  applyleave:applyleave[]=[];
  Apply:applyleave;
  Leaves: leave[];
  leav:leave={
    name:'s',
    id:0,
    maxleavesallowed:5
  };
  LeaveLeft:number[];
  errorMessage: string;
  MyLeave:myleave[]=[];
  Lee:myleave= this.employeeservice.initializeMyLeave()
  looper:applyleave;
  
  constructor(private employeeservice:EmployeeService,
    private router:Router) { }

  ngOnInit(): void {
    if(this.employeeservice.profile === undefined)
    {
      this.router.navigate(['/employee/myprofile'])
    }
  this.employeeservice.getLeave().subscribe({
    next: leave => {
      this.Leaves = leave;   
    },
    error: err => this.errorMessage = err,
    complete: () => this.GetMyLeaveList()
  });
  
  }
  GetMyLeaveList(){
    this.employeeservice.getEmployeeLeave().subscribe({
      next: leave => {
        this.applyleave = leave;
      },
      error: err => (this.errorMessage = err),
      complete: () => this.Table()
    });
    
  }
  Table():void
  {
    let j =0
    for (var i = 0; i < this.applyleave.length; i++) {
      this.Apply = this.applyleave[i];
      if(this.Apply.employeeId != this.employeeservice.profile.id){continue;}
      this.Lee.leavedate = String(this.Apply.leaveStartDate + ' to ' + this.Apply.leaveEndDate);
      this.Lee.days = this.employeeservice.DateToDays(new Date(this.Apply.leaveStartDate).getTime(),new Date(this.Apply.leaveEndDate).getTime());
      this.Lee.status = this.Apply.status;
      this.leav = this.Leaves.find(a => a.id == this.Apply.leaveId);
      if(this.leav != null)
      {
        this.Lee.leavetype = this.leav.name;
        if(this.Lee.status ==='Approved' || this.Lee.status === 'Pending'){
          this.leav.maxleavesallowed = this.leav.maxleavesallowed - this.Lee.days
        }
      }
      this.MyLeave[j] = this.Lee;
      j +=1;
      this.Lee= this.employeeservice.initializeMyLeave()
    }
    }
    NewLeave():void{

      this.employeeservice.getLeaveData(this.Leaves);
      this.router.navigate(['/employee/myleave', 0, 'add']);
  }
}
