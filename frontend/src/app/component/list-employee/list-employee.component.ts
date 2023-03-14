import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, switchMap } from 'rxjs';
import { Employee, employees } from 'src/app/service/Employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { AppState } from 'src/app/store';
import {
  addEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from 'src/app/store/actions/employee.action';
import { selectEmployees } from 'src/app/store/selectors/employee.selector';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss'],
})
export class ListEmployeeComponent implements OnInit {
  loading: boolean = true;
  employees: Employee[] = [];
  currentEmployee: Employee = {};
  showUpdateModal: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.employeeService
      .listEmployees()
      .then((employees) => {
        this.store.dispatch(fetchEmployees({ employees }));
        this.store
          .select(selectEmployees)
          .pipe(
            switchMap((emps) => {
              if (emps) {
                return of(emps);
              } else {
                return this.store.select(selectEmployees);
              }
            })
          )
          .subscribe((value) => {
            this.employees = value;
            this.loading = false;
          });
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  onAddEmployee(emp: Employee) {
    this.loading = true;
    this.employeeService
      .addEmployee(emp)
      .then((employee) => {
        this.store.dispatch(addEmployee({ employee }));
        console.log(employee);
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  onUpdateEmployee(emp: Employee) {
    this.loading = true;
    emp = { ...emp, ...{ id: <number>this.currentEmployee.id } };
    this.employeeService.updateEmployee(emp).then((employee) => {
      this.store.dispatch(
        updateEmployee({ id: <number>employee.id, data: employee })
      );
      this.loading = false;
    });
  }

  onDeleteEmployee(id: number) {
    this.loading = true;
    this.employeeService
      .deleteEmployee(id)
      .then((employee) => {
        this.store.dispatch(deleteEmployee({ id }));
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  showUpdateEmployee(e: Employee) {
    this.currentEmployee = e;
  }

  showDeleteEmployee(e: Employee) {
    this.currentEmployee = e;
  }
}
