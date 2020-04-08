import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { NavBarAdminComponent } from './nav-bar-admin/nav-bar-admin.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { LeavelistComponent } from './leavelist/leavelist.component';
import { AddLeaveComponent } from './add-leave/add-leave.component';
import { LeaveListEmployeeComponent } from './leave-list-employee/leave-list-employee.component';


@NgModule({
  declarations: [EmployeelistComponent, NavBarAdminComponent, AddEmployeeComponent, LeavelistComponent, AddLeaveComponent, LeaveListEmployeeComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'admin/employees', component: EmployeelistComponent }, 
      {path: 'admin/leave', component: LeavelistComponent },
      {path: 'admin/leavelist', component: LeaveListEmployeeComponent }
    ])
  ]
})
export class AdminModule { }
