import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { employee } from 'src/app/data/employee';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  
  errorMessage: string;
  email:string;
  pageTitle = "Edit Employee"
  currentEmployee:employee = this.employeeservice.initializeEmployee();
  availability:boolean = true;
  mail: boolean = true;
  get employee(): employee {
    return this.currentEmployee;
  }
  set employee(value: employee) {
    this.currentEmployee = value;
  }
  
  constructor(private employeeservice: AdminService,
    private route: ActivatedRoute,
    private router: Router) { }


  available(email:string){
    this.employeeservice.check(email);
  }


  pageTitleSet(id:number):string{
    if (id === 0){
      return 'Add Employee'
    }
    else if(id === null){
      alert('Something Went Wrong Retry')
      this.router.navigate(['/admin/employees']);
      return 'Leave Not Found'
    }
    else{
      return 'Edit Employee'
    }
  }
  FromIsValid():boolean{
    if (this.employee.name && this.employee.name.length > 3 &&
      this.employee.email && this.employee.password && this.employee.password.length > 8 &&this.employee.doj &&this.employee.doj)
      {
        return true
      }
    return false
  }
  saveEmployee(): void {
    
    if(this.FromIsValid()){
      
      if(!this.employeeservice.list || this.email === this.employee.email)
      {
        if (this.employee.id === 0) 
          {
              this.employeeservice.createEmployee(this.employee).subscribe({
              next: () => this.onSaveComplete(`The new ${this.employee.name} was saved`),});
            }
            
        else
        {
          this.employeeservice.updateEmployee(this.employee).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.employee.name} was saved`),})
        }
      
      }
      else{
        this.availability = false
        }
     }
     
}
  private dataIsValid: { [key: string]: boolean } = {};
  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }
  validate(): void {
    this.dataIsValid = {};
    if (this.employee.name &&
      this.employee.email && this.employee.password && this.employee.doj &&this.employee.doj) {
      this.dataIsValid['edit'] = true;
    } else {
      this.dataIsValid['edit'] = false;
    }
  }
  onSaveComplete(message?: string): void {
    this.router.navigate(['/admin/employees']);
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.employeeservice.getEmployee(id).subscribe({
      next: employee => {this.employee = employee;},
      error: err => this.errorMessage = err,
      complete: () => this.checker(this.employee.email)
    })
    this.pageTitle=this.pageTitleSet(id)
    
  }
  checker(email:string){
    if(email.length > 4 )
    {
      this.email = email
    }
    else{
      this.email= "no"
    }
  }
}
