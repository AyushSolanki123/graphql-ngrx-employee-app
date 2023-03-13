import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/service/Employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLogin: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private storageService: StorageService
  ) {}

  changeAuth(login: boolean) {
    this.isLogin = login;
  }

  onLogin(payload: { email: string; password: string }) {
    this.loading = true;
    this.employeeService.login(payload).subscribe(
      (response) => {
        this.storageService.setTokenPair(JSON.stringify(response));
        this.router.navigateByUrl('/list');
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  onRegister(emp: Employee) {
    this.loading = true;
    this.employeeService.register(emp).subscribe(
      (response) => {
        console.log(response);
        this.isLogin = true;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
}
