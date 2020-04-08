import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddleaveComponent } from '../addleave/addleave.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'employee/myleave/:id/add', component: AddleaveComponent }

    ])
  ]
})
export class MyleaveModule { }
