import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { Router } from '@angular/router';
import { StorageService } from './service/storage.service';
import { AuthService } from './service/auth.service';
import { Subscription, switchMap, tap, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Graphql ngrx employee app';
  status!: boolean;
  private subcription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.subcription = timer(0, 5000)
      .pipe(switchMap(() => this.authService.checkLoginStatus()))
      .subscribe(
        (isLoggedIn) => {
          this.status = isLoggedIn;
          if (isLoggedIn) {
            this.router.navigateByUrl('/list');
          } else {
            this.storageService.removeTokenPair();
            this.router.navigateByUrl('/auth');
          }
        },
        (error) => {
          console.log(error);
          this.storageService.removeTokenPair();
          this.router.navigateByUrl('/auth');
        }
      );
  }
  logOut() {
    this.status = false;
    this.storageService.removeTokenPair();
    this.router.navigateByUrl('/auth');
  }
}
