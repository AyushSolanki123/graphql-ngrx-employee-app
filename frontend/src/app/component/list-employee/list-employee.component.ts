import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Employee, employees } from 'src/app/service/Employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { AppState } from 'src/app/store';
import {
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from 'src/app/store/actions/employee.action';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss'],
})
export class ListEmployeeComponent implements OnInit {
  loading: boolean = true;
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.employeeService.listEmployees().subscribe(
      (value) => {
        this.employees = value;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  onAddEmployee(emp: Employee) {
    this.loading = true;
    this.employeeService.addEmployee(emp).subscribe(
      (value) => {
        this.store.dispatch(addEmployee({ employee: value }));
        console.log(value);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  onUpdateEmployee(emp: Employee) {
    this.loading = true;
    this.employeeService.updateEmployee(emp).subscribe(
      (value) => {
        this.store.dispatch(
          updateEmployee({ id: <number>value.id, data: value })
        );
        console.log(value);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  onDeleteEmployee(id: number) {
    this.loading = true;
    this.employeeService.deleteEmployee(id).subscribe(
      (value) => {
        this.store.dispatch(deleteEmployee({ id }));
        console.log(value);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
}
