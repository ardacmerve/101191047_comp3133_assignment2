import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'employee-list', 
    component: EmployeeListComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'employee-form', 
    component: EmployeeFormComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'employee-form/:id', 
    component: EmployeeFormComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'employee-details/:id', 
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
