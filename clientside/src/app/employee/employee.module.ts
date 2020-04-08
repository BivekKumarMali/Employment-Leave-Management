import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarEmployeeComponent } from './nav-bar-employee/nav-bar-employee.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { AddleaveComponent } from './addleave/addleave.component';
import { MyleaveComponent } from './myleave/myleave.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {DatePipe} from '@angular/common';



@NgModule({
  declarations: [MyprofileComponent, AddleaveComponent, MyleaveComponent, NavBarEmployeeComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'employee/myprofile', component: MyprofileComponent }, 
      {path: 'employee/myleave', component: MyleaveComponent }

    ])
  ],
  providers: [
    DatePipe
  ]
})
export class EmployeeModule { }
