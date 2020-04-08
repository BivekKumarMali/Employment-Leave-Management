import { Component, OnInit } from '@angular/core';
import { leave } from 'src/app/data/leave';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { applyleave } from 'src/app/data/applyleave';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-leavelist',
  templateUrl: './leavelist.component.html',
  styleUrls: ['./leavelist.component.css']
})
export class LeavelistComponent implements OnInit {

  leave: leave[] = [];
  errorMessage:string;
  ApplyLeave:applyleave[]=[];


  constructor(private leaveservice: AdminService,
              private router: Router) { }


  onDelete(leave: leave): void {
    if (confirm(`Really delete the Employee: ${leave.name}?`)) {
      this.leaveservice.deleteLeave(leave.id).subscribe({
        next: () => this.onSaveComplete(`${leave.name} was deleted`),
        error: err => this.errorMessage = err,
        complete: () => this.CheckEmployeeLeave(leave.id)
      });
      
    }
  }
  CheckEmployeeLeave(leaveId:number){
    this.leaveservice.getEmployeeLeave().subscribe({
      next: leave => {
        this.ApplyLeave = leave;
      },
      error: err => (this.errorMessage = err),
      complete: () => this.DeleteEmployeeLeave(leaveId)
    });

  }
  DeleteEmployeeLeave(leaveId:number){
    let n = this.ApplyLeave.findIndex(a => a.leaveId === leaveId)
    this.ApplyLeave.splice(n,1)
    if(n != -1){
      this.leaveservice.deleteEmployeeLeave(leaveId).subscribe({
        next: () => this.onSaveComplete(' was deleted'),
        error: err => this.errorMessage = err,
        complete: () => this.DeleteEmployeeLeave(leaveId)
      });      
      }
      this.ngOnInit()
    }
    
    
  

  Test(leaveId:number){
    alert((this.ApplyLeave.findIndex(a => a.leaveId === leaveId))+''+leaveId)

  }
  onSaveComplete(message?: string): void {

    this.router.navigate(['/admin/leave']);

  }

  ngOnInit(): void {
    this.leaveservice.getLeave().subscribe({
      next: leave => {
        this.leave = leave;
      },
      error: err => this.errorMessage = err
    });
  }

}
