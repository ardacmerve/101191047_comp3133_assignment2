import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {
  GET_ALL_EMPLOYEES,
  GET_EMPLOYEE_BY_ID,
  SEARCH_EMPLOYEES
} from '../graphql/queries';
import {
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE
} from '../graphql/mutations';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getAllEmployees() {
    return this.apollo.watchQuery({
      query: GET_ALL_EMPLOYEES
    }).valueChanges.pipe(map((res: any) => res.data.getAllEmployees));
  }

  getEmployeeById(id: string) {
    return this.apollo.query({
      query: GET_EMPLOYEE_BY_ID,
      variables: { id }
    }).pipe(map((res: any) => res.data.getEmployeeById));
  }

  addEmployee(employee: any) {
    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: employee
    });
  }

  updateEmployee(id: string, employee: any) {
    return this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: { id, ...employee }
    });
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { id }
    });
  }

  searchEmployees(department?: string, designation?: string) {
    return this.apollo.query({
      query: SEARCH_EMPLOYEES,
      variables: { department, designation }
    }).pipe(map((res: any) => res.data.searchEmployees));
  }
}
