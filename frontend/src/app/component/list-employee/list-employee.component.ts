import { Component } from '@angular/core';
import { Employee, employees } from 'src/app/service/Employee';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss'],
})
export class ListEmployeeComponent {
  employees: Employee[] = employees;

  onAddEmployee(emp: Employee) {}

  onUpdateEmployee(emp: Employee) {}

  onDeleteEmployee(id: number) {}
}
