import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-nav-bar-employee',
  templateUrl: './nav-bar-employee.component.html',
  styleUrls: ['./nav-bar-employee.component.css']
})
export class NavBarEmployeeComponent implements OnInit {


  
  valid:boolean = true;

  constructor(private router:Router,
              private employeeservice:EmployeeService) { }

  Logout()
  {
    this.employeeservice.findprofile('reset');
    this.valid = this.employeeservice.loggedin();
    this.router.navigate(['/employee'])
  }
  ngOnInit(): void {
    this.valid = this.employeeservice.loggedin();
  }

}
