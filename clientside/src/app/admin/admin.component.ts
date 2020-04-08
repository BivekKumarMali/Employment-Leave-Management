import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit(form: NgForm){
    
    this.router.navigate(['/admin/employees']);
  }
}
