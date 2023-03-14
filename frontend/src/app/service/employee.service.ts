import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map, of } from 'rxjs';
import { Employee } from './Employee';
import { GET_EMPLOYEE, LIST_EMPLOYEES } from '../graphql/queries';
import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from '../graphql/mutations';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apollo: Apollo, private authService: AuthService) {}

  async listEmployees(): Promise<Employee[]> {
    const response = await this.authService.callGraphqlApi(LIST_EMPLOYEES);
    return response.listEmployee;
  }

  async getEmployee(id: number): Promise<Employee> {
    const response = await this.authService.callGraphqlApi(GET_EMPLOYEE, {
      id: id,
    });
    return response.getEmployee;
  }

  async addEmployee(payload: Employee): Promise<Employee> {
    const response = await this.authService.callGraphqlApi(ADD_EMPLOYEE, {
      input: payload,
    });
    return response.addEmployee;
  }

  async updateEmployee(payload: Employee): Promise<Employee> {
    const response = await this.authService.callGraphqlApi(UPDATE_EMPLOYEE, {
      input: payload,
    });
    return response.updateEmployee;
  }

  async deleteEmployee(id: number): Promise<Employee> {
    const response = await this.authService.callGraphqlApi(DELETE_EMPLOYEE, {
      id: id,
    });
    return response.deleteEmployee;
  }
}
