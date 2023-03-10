import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '..';
import { EmployeeState } from '../reducers/employee.reducer';

const selectEmployeeState = createFeatureSelector<AppState, EmployeeState>(
  'employeeState'
);

export const selectEmployees = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.employees
);
