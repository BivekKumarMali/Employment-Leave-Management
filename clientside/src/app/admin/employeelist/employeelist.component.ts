import { Component, OnInit } from '@angular/core';
import { employee } from 'src/app/data/employee';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { applyleave } from 'src/app/data/applyleave';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {

  pageTitle = 'Employee List';
  errorMessage = '';
    FilterEmployee: employee[] = [];
    employee: employee[] = [];
    mails: string [];
  _listFilter = '';
  ApplyLeave: applyleave[]=[];
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.FilterEmployee = this.listFilter ? this.performFilter(this.listFilter) : this.employee;
  }


  constructor(public employeeservice: AdminService,
    private router: Router,
    private route: ActivatedRoute) {  }


  performFilter(filterBy: string): employee[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.employee.filter((product: employee) =>
      product.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onDelete(employee: employee): void {
    if (confirm(`Really delete the Employee: ${employee.name}?`)) {
      this.employeeservice.deleteEmployee(employee.id).subscribe({
        next: () => this.onSaveComplete(`${employee.name} was deleted`),
        error: err => this.errorMessage = err,
        complete: () =>this.CheckEmployeeLeave(employee.id)
      });
    }
    
  }
  CheckEmployeeLeave(EmployeeId:number){
    this.employeeservice.getEmployeeLeave().subscribe({
      next: leave => {
        this.ApplyLeave = leave;
      },
      error: err => (this.errorMessage = err),
      complete: () => this.DeleteEmployeeLeave(EmployeeId)
    });

  }
  DeleteEmployeeLeave(EmployeeId:number){
    let n = this.ApplyLeave.findIndex(a => a.employeeId === EmployeeId)
    this.ApplyLeave.splice(n,1)
    if(n != -1){
      this.employeeservice.deleteEmployeeLeave2(EmployeeId).subscribe({
        next: () => this.onSaveComplete(' was deleted'),
        error: err => this.errorMessage = err,
        complete: () => this.DeleteEmployeeLeave(EmployeeId)
      });      
      }
      this.ngOnInit()
    }
   
  onSaveComplete(message?: string): void {

    this.router.navigate(['/admin/employees']);
  }



  ngOnInit(): void {
    this.employeeservice.getEmployees().subscribe({
      next: products => {
        this.employee = products;
        this.FilterEmployee = this.employee;
      },
      error: err => this.errorMessage = err
    });
  }

}
