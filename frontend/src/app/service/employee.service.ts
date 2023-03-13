import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './Employee';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  authApiUrl: string = 'http://localhost:4000/auth';
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  login(payload: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.authApiUrl + '/login', payload);
  }

  register(payload: Employee): Observable<any> {
    return this.http.post<any>(this.authApiUrl + '/register', payload);
  }

  refreshToken(refreshToken: string): Observable<{ authToken: string }> {
    return this.http.post<{ authToken: string }>(
      this.authApiUrl + '/refreshToken',
      { refreshToken }
    );
  }

  checkLoginStatus(): Observable<{ status: boolean }> {
    const { authToken } = this.storageService.getTokenPair();
    return this.http.post<{ status: boolean }>(
      this.authApiUrl + '/checkLoginStatus',
      { authToken }
    );
  }
}
