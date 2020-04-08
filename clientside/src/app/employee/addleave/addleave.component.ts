import { Component, OnInit } from '@angular/core';
import { leave } from 'src/app/data/leave';
import { DatePipe } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { applyleave } from 'src/app/data/applyleave';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addleave',
  templateUrl: './addleave.component.html',
  styleUrls: ['./addleave.component.css']
})
export class AddleaveComponent implements OnInit {

  inverseDate:boolean = false;
  ListOfLeaves:leave[]=[];
  errorMessage: string;
  Days:number;
  invalidDate: boolean = false;
  name:string= '';

  leav:leave = {
    id: 0,
    maxleavesallowed: 2,
    name:''
  };

  ApplyLeave:applyleave = {
    id : 0,
    employeeId : 0,
    leaveEndDate : new Date(this.datapipe.transform(new Date(),"dd-MM-yyyy")),
    leaveId : 0,
    leaveStartDate : new Date(),
    status: 'Pending'
  }

  constructor(private employeeservice: EmployeeService,
        private datapipe: DatePipe,
        private router: Router) { }

  
  Save(){
    this.Days =this.employeeservice.DateToDays(new Date(this.ApplyLeave.leaveStartDate).getTime(),new Date(this.ApplyLeave.leaveEndDate).getTime())
    if(this.name && this.ApplyLeave.leaveStartDate && this.ApplyLeave.leaveEndDate)
    {
      
       console.log(this.ApplyLeave.leaveStartDate)
      this.leav = this.ListOfLeaves.find(a => a.name === this.name);
      if(this.Days > 0 && this.Days <= this.leav.maxleavesallowed)
      {
          this.ApplyLeave.employeeId = this.employeeservice.profile.id;
          this.ApplyLeave.leaveId = this.leav.id;
          console.log(this.ApplyLeave)
          this.employeeservice.createEmployeeLeave(this.ApplyLeave).subscribe({
            next: () => this.onSaveComplete(`The new ${this.ApplyLeave} was saved`),
          });

    }
    else if(this.Days > this.leav.maxleavesallowed){
      this.invalidDate = true;
    }
    else{this.inverseDate = true;
    }
  }
    
    
    console.log(this.leav)
  } 
  onSaveComplete(message?: string): void {
    this.router.navigate(['/employee/myleave']);
  }
  ngOnInit(): void {
    this.ListOfLeaves = this.employeeservice.Leaves
  }

}
