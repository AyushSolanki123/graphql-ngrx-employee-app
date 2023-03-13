import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/service/Employee';
import { AuthService } from 'src/app/service/auth.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLogin: boolean = true;
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  changeAuth(login: boolean) {
    this.isLogin = login;
  }

  onLogin(payload: { email: string; password: string }) {
    this.loading = true;
    this.authService.login(payload).subscribe(
      (response) => {
        this.storageService.setTokenPair(JSON.stringify(response.tokenPair));
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
    this.authService.register(emp).subscribe(
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
