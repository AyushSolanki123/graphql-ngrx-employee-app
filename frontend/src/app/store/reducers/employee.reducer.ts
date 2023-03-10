import { createReducer, on } from '@ngrx/store';
import { Employee } from 'src/app/service/Employee';
import {
  addEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from '../actions/employee.action';

export interface EmployeeState {
  employees: Employee[];
}

export const initialState: EmployeeState = {
  employees: [],
};

const _employeeReducer = createReducer(
  initialState,

  on(fetchEmployees, (state, { employees }) => {
    return { ...state, employees: employees };
  }),
  on(addEmployee, (state, { employee }) => {
    return {
      ...state,
      employees: [...state.employees, employee],
    };
  }),
  on(updateEmployee, (state, { id, data }) => {
    return {
      ...state,
      employees: state.employees.map((e) =>
        e.id == id ? { ...e, ...data } : e
      ),
    };
  }),
  on(deleteEmployee, (state, { id }) => {
    return {
      ...state,
      employees: state.employees.filter((e) => e.id != id),
    };
  })
);

export const employeeReducer = (state: any, action: any) => {
  return _employeeReducer(state, action);
};
