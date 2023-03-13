import { Component, EventEmitter, Output } from '@angular/core';
import { Employee } from 'src/app/service/Employee';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() onRegister: EventEmitter<Employee> = new EventEmitter();
  @Output() onLogin: EventEmitter<boolean> = new EventEmitter();

  firstName!: string;
  lastName!: string;
  dob!: string;
  company!: string;
  email!: string;
  password!: string;

  login() {
    this.onLogin.emit(true);
  }

  register() {
    const reqBody: Employee = {
      firstName: this.firstName,
      lastName: this.lastName,
      dob: this.dob,
      company: this.company,
      email: this.email,
      password: this.password,
    };
    this.onRegister.emit(reqBody);
  }
}
