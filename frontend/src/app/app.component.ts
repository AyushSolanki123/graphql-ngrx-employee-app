import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { Router } from '@angular/router';
import { StorageService } from './service/storage.service';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Graphql ngrx employee app';

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const { authToken } = this.storageService.getTokenPair();

    if (authToken) {
      this.authService.checkLoginStatus().subscribe(({ status }) => {
        if (status) {
          this.router.navigateByUrl('/list');
        } else {
          this.storageService.removeTokenPair();
          this.router.navigateByUrl('/auth');
        }
      });
    } else {
      this.storageService.removeTokenPair();
      this.router.navigateByUrl('/auth');
    }
  }
}
