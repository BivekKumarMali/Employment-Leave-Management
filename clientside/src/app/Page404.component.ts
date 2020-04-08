import { Component } from '@angular/core';
import {  Router } from '@angular/router';



@Component({
  template: `
    <h1>HTTP 404</h1>
    <p>Page Not Found</p>
    <button class="btn" (click)='Admin()'>Admin</button>
    <button class="btn" (click)='Employee()'>Employee</button>
    `
})
export class Page404Component{
    constructor(public router: Router) {}
    Admin(){
        this.router.navigate(['/admin'])
    }
    Employee(){
        this.router.navigate(['/admin'])
    }
  }