import { Injectable, ErrorHandler } from '@angular/core';
import { employee, EmployeeResolved } from '../data/employee';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError, of,  } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators'; 
import { leave } from '../data/leave';
import { applyleave } from '../data/applyleave';
import { myleave } from '../data/myleave';
import { employeeleave } from '../data/employeeleave';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  

  check(email: string) 
  {
    this.http.get(this.url +'/check/'+ email).toPromise().then(res => this.list = res as employee);
    
  }
  
  
  private headers: HttpHeaders;
  list:employee;
  data:employee;


  readonly url = "http://localhost:4956"
  formData: employee;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  updateEmployee(employee: employee): Observable<employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<employee>(this.url+'/weatherforecast/' +employee.id, employee, { headers })
      .pipe(
        map(() => employee),
        catchError(this.handleError)
      );
  }
  createEmployee(employee: employee): Observable<employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<employee>(this.url+'/weatherforecast', employee, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  getEmployees():Observable<employee[]>{
    return this.http.get<employee[]>(this.url+'/weatherforecast')
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteEmployee(id: number):Observable<{}>  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.delete<employee>(this.url+ '/weatherforecast/'+id)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  arr2:EmployeeResolved
  getEmployee(id: number): Observable<employee> {
    if (id === 0) {
      return of(this.initializeEmployee());
    }
    return this.http.get<employee>(this.url+ '/weatherforecast/'+id)
      .pipe(
        catchError(e => this.handleError(e))
      );
  }
  public initializeEmployee(): employee {
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

  getLeave():Observable<leave[]>{
    return this.http.get<leave[]>(this.url+'/leave')
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteLeave(id: number):Observable<{}>  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.delete<employee>(this.url+ '/leave/'+id)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateLeave(leave: leave): Observable<leave> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<leave>(this.url+'/leave/' +leave.id, leave, { headers })
      .pipe(
        map(() => leave),
        catchError(this.handleError)
      );
  }
  createLeave(leave: leave): Observable<leave> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<leave>(this.url+'/leave', leave, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getLeavebyid(id: number): Observable<leave> {
    if (id === 0) {
      return of(this.initializeLeave());
    }
    return this.http.get<leave>(this.url+ '/leave/'+id)
      .pipe(

        catchError(e => this.handleError(e))
      );
  }
  
  initializeLeave(): leave {
    return {
      id : 0,
      name :'',
      maxleavesallowed : null

    };
  }
  getEmployeeLeave():Observable<applyleave[]>{
    return this.http.get<applyleave[]>(this.url+'/EmployeeLeave')
      .pipe(
        catchError(this.handleError)
      );
  }
  public initializeApplyLeave(): applyleave {
    return {
      employeeId:0,
      id:0,
      leaveEndDate:null,
      leaveId:0,
      leaveStartDate:null,
      status:''
    };
  }
  public initializeEmployeeLeave():employeeleave{
    return{
      id:0,
      EmployeeName:'',
      EndDate:null,
      Leave:0,
      LeaveType:'',
      NumberOfDays:0,
      StartDate:null,
      Status:''
    };
  }

  DateToDays(arg0: number, arg1: number): number {
    return Math.round((arg1-arg0)/86400000)
  }
  updateApplyLeave(ApplyLeave: applyleave): Observable<applyleave> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<applyleave>(this.url+'/EmployeeLeave/' +ApplyLeave.id, ApplyLeave, { headers })
      .pipe(
        map(() => ApplyLeave),
        catchError(this.handleError)
      );
  }
  deleteEmployeeLeave(leaveId: number):Observable<{}>  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<applyleave>(this.url+'/EmployeeLeave/'+leaveId, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteEmployeeLeave2(EmployeeId: number):Observable<{}>  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<applyleave>(this.url+'/check/'+EmployeeId, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  






  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(err)
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
