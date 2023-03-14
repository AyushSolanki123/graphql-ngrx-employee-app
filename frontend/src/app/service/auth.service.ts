import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Employee } from './Employee';
import { Observable, from, tap, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { LIST_EMPLOYEES } from '../graphql/queries';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authApiUrl: string = 'http://localhost:4000/auth';
  GRAPHQL_URI: string = 'http://localhost:4000/graphql';
  loginStatus!: boolean;
  private apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private apollo: Apollo,
    private httpLink: HttpLink
  ) {
    const authLink = setContext((_, { headers }) => {
      const tokenPair = this.getTokenPair();
      return {
        headers: {
          ...headers,
          Authorization: tokenPair ? `Bearer ${tokenPair.authToken}` : '',
        },
      };
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log('GraphQL Errors:', graphQLErrors);
      }
      if (networkError) {
        console.log('Network Error:', networkError);
      }
    });

    this.apolloClient = new ApolloClient({
      link: errorLink.concat(
        authLink.concat(httpLink.create({ uri: this.GRAPHQL_URI }))
      ),
      cache: new InMemoryCache(),
    });
  }

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

  // checkLoginStatus(): Observable<{ status: boolean }> {
  //   const tokenPair = this.storageService.getTokenPair();
  //   return this.http.post<{ status: boolean }>(
  //     this.authApiUrl + '/checkLoginStatus',
  //     { authToken: tokenPair.authToken }
  //   );
  // }

  public async checkLoginStatus(): Promise<boolean> {
    const tokenPair = this.getTokenPair();
    if (!tokenPair) {
      return false;
    }
    try {
      const response = await this.http
        .post<{ status: boolean }>(this.authApiUrl + '/checkLoginStatus', {
          authToken: tokenPair.authToken,
        })
        .toPromise();
      this.loginStatus = response!.status;
    } catch (err) {
      console.log('Error checking login status:', err);
    }
    return this.loginStatus;
  }

  async callGraphqlApi(query: any, variables: any = {}): Promise<any> {
    const isMutation = query.toLowerCase().includes('mutation');
    let result;
    if (isMutation) {
      const mutationOperation = {
        mutation: gql`
          ${query}
        `,
        refetchQueries: [
          {
            query: gql`
              ${LIST_EMPLOYEES}
            `,
          },
        ],
        variables,
      };
      result = await this.apolloClient.mutate(mutationOperation);
    } else {
      const queryOperation = {
        query: gql`
          ${query}
        `,
        variables,
      };
      result = await this.apolloClient.query(queryOperation);
    }

    return result.data;
  }

  getTokenPair(): {
    authToken: string;
    refreshToken: string;
  } | null {
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
