import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/service/Employee';

@Component({
  selector: 'app-update-employee-modal',
  templateUrl: './update-employee-modal.component.html',
  styleUrls: ['./update-employee-modal.component.scss'],
})
export class UpdateEmployeeModalComponent implements OnInit {
  @Input() emp!: Employee;
  @Output() updateEmployee: EventEmitter<Employee> = new EventEmitter();

  initEmp!: Employee;

  ngOnInit(): void {
    this.initEmp = this.emp;
  }

  onSubmit() {
    this.updateEmployee.emit(this.initEmp);
  }
}
