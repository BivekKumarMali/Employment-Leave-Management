import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { leave } from 'src/app/data/leave';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.css']
})
export class AddLeaveComponent implements OnInit {

  errorMessage: string;

  constructor(private leaveservice: AdminService,
              private route: ActivatedRoute,
              private router: Router) { }
  pageTitle = "Edit Leave"
  currentLeave:leave;
  get leave(): leave {
    return this.currentLeave;
  }
  set leave(value: leave) {
    this.currentLeave = value;
  }
  resetdata:leave = this.leave;
  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.leaveservice.getLeavebyid(id).subscribe({
      next: leave => {
        this.leave = leave;
      },
      error: err => this.errorMessage = err
    });
    this.pageTitle=this.pageT(id)
  }
  pageT(id:number):string
  {
    if (id=== null)
    {
      alert('Something Went Wrong Retry')
      this.router.navigate(['/admin/leave']);
      return 'Leave Not Found'

    }
    if(id === 0)
    {
      return 'Add Leave'
    }
    else{
      return 'Edit Leave'
    }

  }
  intialize(form:leave)
  {
    this.leave.name = form.name;
  }

  
  saveLeave(): void {

    if (this.leave.id === 0) {
      this.leaveservice.createLeave(this.leave).subscribe({
        next: () => this.onSaveComplete(`The new ${this.leave.name} was saved`),
      });
    } else {
      this.leaveservice.updateLeave(this.leave).subscribe({
        next: () => this.onSaveComplete(`The updated ${this.leave.name} was saved`),
      })
    };

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
    if (this.leave.name &&
      this.leave.maxleavesallowed > 0) {
      this.dataIsValid['edit'] = true;
    } else {
      this.dataIsValid['edit'] = false;
    }


  }
  onSaveComplete(message?: string): void {
    this.router.navigate(['/admin/leave']);
  }
    
  resetform(){
    this.leave = this.resetdata;
  }
}
