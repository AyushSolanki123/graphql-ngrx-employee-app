import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Employee } from './Employee';
import { Observable, from, tap, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authApiUrl: string = 'http://localhost:4000/auth';
  GRAPHQL_URI: string = 'http://localhost:4000/graphql';

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
    const tokenPair = this.storageService.getTokenPair();
    return this.http.post<{ status: boolean }>(
      this.authApiUrl + '/checkLoginStatus',
      { authToken: tokenPair.authToken }
    );
  }

  // callGraphqlApi(query: any, variables: any = {}): Promise<any> {
  //   return from(this.getTokenPair()).pipe(
  //     switchMap((tokenPair) => {
  //       const http = this.httpLink.create({uri: this.GRAPHQL_URI});

  //       // If we have a tokenPair, add the authToken to the request headers
  //       if (tokenPair) {
  //         http['options'].headers = {
  //           ...http['options'].headers,
  //           Authorization: `Bearer ${tokenPair.authToken}`,
  //         };
  //       }

  //       const apolloClient = new Apollo({
  //         link: http,
  //         cache: new InMemoryCache(),
  //       });

  //       return apolloClient.query<any>({
  //         query,
  //         variables,
  //       }).toPromise();
  //     })
  //   )
  // }

  async getTokenPair(): Promise<{
    authToken: string;
    refreshToken: string;
  } | null> {
    const tokenPairString = JSON.stringify(this.storageService.getTokenPair());

    if (!tokenPairString) {
      return null;
    }

    const tokenPair = JSON.parse(tokenPairString);
    const isAuthTokenExpired = new Date(tokenPair.expiresAt) < new Date();

    if (isAuthTokenExpired) {
      return null;
    }

    return tokenPair;
  }
}
