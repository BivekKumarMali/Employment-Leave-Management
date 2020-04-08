import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { Page404Component } from './Page404.component';
import { SelectiveStrategy } from './selective-strategy.service';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'admin', component: AdminComponent },
    { path: 'employee', component: EmployeeComponent },
    {
      path: 'admin',
      data: { preload: false },
      loadChildren: () =>
        import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
      path: 'employees',
      data: { preload: false },
      loadChildren: () =>
        import('./admin/employeelist/employeelist.module').then(m => m.EmployeelistModule)
    },
    {
      path: 'leave',
      data: { preload: false },
      loadChildren: () =>
        import('./admin/leavelist/leavelist.module').then(m => m.LeavelistModule)
    },
    {
      path: 'employee',
      data: { preload: false },
      loadChildren: () =>
        import('./employee/employee.module').then(m => m.EmployeeModule)
    },
    {
      path: 'myleave',
      data: { preload: false },
      loadChildren: () =>
        import('./employee/myleave/myleave.module').then(m => m.MyleaveModule)
    },
    { path: '' , redirectTo: 'admin', pathMatch: 'full'}
    
 
  ], { enableTracing: true, preloadingStrategy: SelectiveStrategy })
],
exports: [RouterModule]
})
export class AppRoutingModule { }
