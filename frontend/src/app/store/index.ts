import { ActionReducerMap } from '@ngrx/store';
import { EmployeeState, employeeReducer } from './reducers/employee.reducer';

export interface AppState {
  employeeState: EmployeeState;
}

export const reducers: ActionReducerMap<AppState> = {
  employeeState: employeeReducer,
};
