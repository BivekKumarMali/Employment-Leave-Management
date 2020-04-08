import { Component, OnInit } from '@angular/core';
import { employee } from 'src/app/data/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  profile: employee;
  WrongEmail: boolean = false;
  NoEmail: boolean = false;
  constructor(private employeeservice:EmployeeService) { }

  private initializeEmployee(): employee {
    return {
      id: 0,
      name: "",
      email: '',
      password: '',
      dob: null,
      doj: null,  
      salary: 200000
    };

  }



  ngOnInit(): void {
    
  this.profile = this.initializeEmployee()
  
    if(this.employeeservice.profile != null)
    {      
      this.profile = this.employeeservice.profile;
      this.WrongEmail = true;
      
      this.employeeservice.validEmp = false;
    }
    else{
      
      this.employeeservice.validEmp = true;
    }
    
  }


}
