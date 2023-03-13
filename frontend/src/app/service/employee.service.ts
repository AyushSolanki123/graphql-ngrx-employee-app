import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { Employee } from './Employee';
import { GET_EMPLOYEE, LIST_EMPLOYEES } from '../graphql/queries';
import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from '../graphql/mutations';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  listEmployees(): Observable<Employee[]> {
    return this.apollo.query({ query: LIST_EMPLOYEES }).pipe(
      map((result: any) => {
        return result.data.listEmployee;
      })
    );
  }

  getEmployee(id: number): Observable<Employee> {
    return this.apollo
      .query({
        query: GET_EMPLOYEE,
        variables: {
          id: id,
        },
      })
      .pipe(
        map((result: any) => {
          return result.data.getEmployee;
        })
      );
  }

  addEmployee(payload: Employee): Observable<Employee> {
    return this.apollo
      .mutate({
        mutation: ADD_EMPLOYEE,
        refetchQueries: [{ query: LIST_EMPLOYEES }],
        variables: {
          input: payload,
        },
      })
      .pipe(map((result: any) => result.data.addEmployee));
  }

  updateEmployee(payload: Employee): Observable<Employee> {
    return this.apollo
      .mutate({
        mutation: UPDATE_EMPLOYEE,
        refetchQueries: [{ query: LIST_EMPLOYEES }],
        variables: {
          input: payload,
        },
      })
      .pipe(map((result: any) => result.data.updateEmployee));
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.apollo
      .mutate({
        mutation: DELETE_EMPLOYEE,
        refetchQueries: [{ query: LIST_EMPLOYEES }],
        variables: {
          id: id,
        },
      })
      .pipe(map((result: any) => result.data.deleteEmployee));
  }
}
