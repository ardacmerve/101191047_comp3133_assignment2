import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({ uri: 'http://localhost:4000/graphql' })
      }),
      deps: [HttpLink]
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
