import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'admin/employees/:id/edit', component: AddEmployeeComponent }

    ])
    
  ]
})
export class EmployeelistModule { }
