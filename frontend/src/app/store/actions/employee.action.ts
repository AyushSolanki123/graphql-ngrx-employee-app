import { createAction, props } from '@ngrx/store';
import { Employee } from 'src/app/service/Employee';

export const FETCH_EMPLOYEES = '[Employee Component] FETCH_EMPLOYEES';
export const ADD_EMPLOYEE = '[Employee Component] ADD_EMPLOYEE';
export const UPDATE_EMPLOYEE = '[Employee Component] UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = '[Employee Component] DELETE_EMPLOYEE';

export const fetchEmployees = createAction(
  FETCH_EMPLOYEES,
  props<{ employees: Employee[] }>()
);

export const addEmployee = createAction(
  ADD_EMPLOYEE,
  props<{ employee: Employee }>()
);

export const updateEmployee = createAction(
  UPDATE_EMPLOYEE,
  props<{ id: number; data: Employee }>()
);

export const deleteEmployee = createAction(
  DELETE_EMPLOYEE,
  props<{ id: number }>()
);
