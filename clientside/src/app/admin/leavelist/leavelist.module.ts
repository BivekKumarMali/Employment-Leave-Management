import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddLeaveComponent } from '../add-leave/add-leave.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'admin/leave/:id/edit', component: AddLeaveComponent }

    ])
  ]
})
export class LeavelistModule { }
