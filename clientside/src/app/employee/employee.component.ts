import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { employee } from '../data/employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private router:Router,
              private employeeservice:EmployeeService) { }

  ngOnInit(): void {
  }


  onSubmit(form: NgForm){
    this.router.navigate(['/employee/myprofile']);
  }
  available(email:string){
    this.employeeservice.findprofile(email);
  }
}
