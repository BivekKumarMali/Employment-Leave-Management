import { Component, OnInit } from '@angular/core';
import { employeeleave } from 'src/app/data/employeeleave';
import { leave } from 'src/app/data/leave';
import { employee } from 'src/app/data/employee';
import { AdminService } from '../admin.service';
import { applyleave } from 'src/app/data/applyleave';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-list-employee',
  templateUrl: './leave-list-employee.component.html',
  styleUrls: ['./leave-list-employee.component.css']
})
export class LeaveListEmployeeComponent implements OnInit {

  
  EmployeeList:employee[];
  SingleEmployee:employee = this.leaveservice.initializeEmployee();
  Name:string[] = [];

  LeaveList:leave[];
  SingleLeave:leave = this.leaveservice.initializeLeave();
  Leave:string[] = [];

  ApplyLeave: applyleave[];
  SingleApplyLeave: applyleave = this.leaveservice.initializeApplyLeave();

  EmployeeLeave:employeeleave[]=[];
  EmployeeL:employeeleave[]=[];
  SingleEmployeeLeave:employeeleave = this.leaveservice.initializeEmployeeLeave();
  Actions:string;
  errorMessage: string;

  searchEmployee:string='';
  searchLeave:string ='';


  constructor(private leaveservice : AdminService,
              private router: Router) { }

  onNameChange(Name:string){
    this.EmployeeLeave = this.performFilterByName(Name);
 
  }
  onLeaveChange(Name:string){
    this.EmployeeLeave = this.performFilterByLeave(Name);
    
    
  }
  filterlist: employeeleave[]=[]
  performFilterByLeave(filterBy: string): employeeleave[] {
    this.filterlist = this.EmployeeL.filter((employee: employeeleave) =>
      employee.LeaveType.indexOf(filterBy) !== -1);
    return this.filterlist.filter((employee: employeeleave) =>
    employee.EmployeeName.indexOf(this.searchEmployee) !== -1);
  }

  performFilterByName(filterBy: string): employeeleave[] {
    this.filterlist = this.EmployeeL.filter((employee: employeeleave) =>
      employee.EmployeeName.indexOf(filterBy) !== -1);
    return  this.filterlist.filter((employee: employeeleave) =>
      employee.LeaveType.indexOf(this.searchLeave) !== -1);
  }

  onChange(status:string,id:number){
    this.SingleApplyLeave = this.ApplyLeave.find(a =>a.id == id);
    this.SingleApplyLeave.status = status;
    this.leaveservice.updateApplyLeave(this.SingleApplyLeave).subscribe({
      error: err => console.log(err),
    })
  };
  
  



  ngOnInit(): void {
    this.EmployeeLeave =[];
    this.Name = []
    this.Leave=[]
    this.leaveservice.getLeave().subscribe({
      next: leave => {
        this.LeaveList = leave;
      },
      error: err => (this.errorMessage = err),
      complete:()=> this.GetEmployee()
    });
    
      
    }
  
  GetEmployee(){
  this.leaveservice.getEmployees().subscribe({
    next: leave => {
      this.EmployeeList = leave;
    },
    error: err => (this.errorMessage = err),
    complete:()=> this.GetEmployeeLeave()
  });
}
GetEmployeeLeave(){
  this.leaveservice.getEmployeeLeave().subscribe({
    next: leave => {
      this.ApplyLeave = leave;
    },
    error: err => (this.errorMessage = err),
    complete: () => this.Table()
  });
  
}
Table(){
  for (let i = 0; i < this.EmployeeList.length; i++) {
    this.SingleEmployee = this.EmployeeList[i]
    this.Name.push(this.SingleEmployee.name)
  }
  for (let i = 0; i < this.LeaveList.length; i++) {
    this.SingleLeave = this.LeaveList[i]
    this.Leave.push(this.SingleLeave.name)
  }
  this.SingleLeave = this.leaveservice.initializeLeave();
  this.SingleEmployee = this.leaveservice.initializeEmployee();
  for (let i = 0; i < this.ApplyLeave.length; i++) {
    this.SingleApplyLeave = this.ApplyLeave[i];
    this.SingleEmployee = this.EmployeeList.find(a => a.id == this.SingleApplyLeave.employeeId);
    this.SingleLeave = this.LeaveList.find(a => a.id == this.SingleApplyLeave.leaveId);
    this.SingleEmployeeLeave.EmployeeName = this.SingleEmployee.name;
    this.SingleEmployeeLeave.EndDate = this.SingleApplyLeave.leaveEndDate;
    this.SingleEmployeeLeave.Leave = this.SingleLeave.maxleavesallowed;
    this.SingleEmployeeLeave.LeaveType =this.SingleLeave.name;
    this.SingleEmployeeLeave.NumberOfDays = this.leaveservice.DateToDays(new Date(this.SingleApplyLeave.leaveStartDate).getTime(),new Date(this.SingleApplyLeave.leaveEndDate).getTime());
    this.SingleEmployeeLeave.StartDate = this.SingleApplyLeave.leaveStartDate;
    this.SingleEmployeeLeave.Status = this.SingleApplyLeave.status;
    this.SingleEmployeeLeave.id = this.SingleApplyLeave.id
    this.EmployeeLeave.push(this.SingleEmployeeLeave)
    this.SingleEmployeeLeave =this.leaveservice.initializeEmployeeLeave()
    
  }
  this.EmployeeL = this.EmployeeLeave;

}
}

