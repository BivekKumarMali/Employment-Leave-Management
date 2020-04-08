import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { AdminModule } from './admin/admin.module';
import {  HttpClientModule } from '@angular/common/http';
import { EmployeelistModule } from './admin/employeelist/employeelist.module';
import { LeavelistModule } from './admin/leavelist/leavelist.module';
import { EmployeeModule } from './employee/employee.module';
import { MyleaveModule } from './employee/myleave/myleave.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    EmployeeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule,
    EmployeelistModule,
    LeavelistModule,
    EmployeeModule,
    MyleaveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
