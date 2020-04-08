import { Injectable } from '@angular/core';
import { employee } from '../data/employee';
import { leave } from '../data/leave';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError, of,  } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators'; 
import { applyleave } from '../data/applyleave';
import { myleave } from '../data/myleave';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  
  readonly url = "http://localhost:4956"
  Leaves:leave[];
  profile: employee;
  validEmp : boolean = false;
  Mylee:myleave[]=[]

  constructor(private http: HttpClient) { }

  

  findprofile(email: string) {
    this.http.get(this.url +'/check/'+ email).toPromise().then(res => this.profile = res as employee);
  }
  loggedin() :boolean{
    if (this.validEmp === false){
    this.validEmp = true;
    return true}
    else{
      this.validEmp =false;
      return false;
    }
  }
  getLeaveData(leav: leave[]) {
    this.Leaves = leav
  }
  DateToDays(arg0: number, arg1: number) {
    return Math.round((arg1-arg0)/86400000)
  }
  
  getLeave():Observable<leave[]>{
    return this.http.get<leave[]>(this.url+'/leave')
      .pipe(
        catchError(this.handleError)
      );
  }
  getLeaveByName():Observable<leave>{
    return this.http.get<leave>(this.url+'/leave')
      .pipe(
        catchError(this.handleError)
      );
  }

  createEmployeeLeave(employeeLeave: applyleave): Observable<applyleave> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<applyleave>(this.url+'/EmployeeLeave', employeeLeave, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getEmployeeLeave():Observable<applyleave[]>{
    return this.http.get<applyleave[]>(this.url+'/EmployeeLeave')
      .pipe(
        catchError(this.handleError)
      );
  }
  public initializeMyLeave(): myleave {
    return {
      days: 0,
      leavedate: '',
       leavetype:'',
       status:'',
    };

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
