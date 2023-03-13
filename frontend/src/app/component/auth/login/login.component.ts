import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() onLogin: EventEmitter<{ email: string; password: string }> =
    new EventEmitter();
  @Output() onRegister: EventEmitter<boolean> = new EventEmitter();

  email!: string;
  password!: string;

  login() {
    const reqBody = {
      email: this.email,
      password: this.password,
    };
    this.onLogin.emit(reqBody);
  }

  register() {
    this.onRegister.emit(false);
  }
}
