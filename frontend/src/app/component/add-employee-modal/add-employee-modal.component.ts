import { Component, EventEmitter, Output } from '@angular/core';
import { Employee } from 'src/app/service/Employee';

@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.scss'],
})
export class AddEmployeeModalComponent {
  @Output() addEmployee: EventEmitter<Employee> = new EventEmitter();
  fName: string = '';
  lName: string = '';
  dob: string = '';
  company: string = '';

  onSubmit() {
    const reqBody: Employee = {
      firstName: this.fName,
      lastName: this.lName,
      dob: this.dob,
      company: this.company,
    };
    this.addEmployee.emit(reqBody);
  }
}
