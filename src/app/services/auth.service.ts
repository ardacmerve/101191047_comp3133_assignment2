import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LOGIN_QUERY } from '../graphql/queries';
import { SIGNUP_MUTATION } from '../graphql/mutations';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private token = '';

  constructor(private apollo: Apollo) {
    this.token = localStorage.getItem('token') || '';
    this.isAuthenticated.next(!!this.token);
  }

  getToken(): string {
    return this.token;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.apollo.query({
      query: LOGIN_QUERY,
      variables: { usernameOrEmail, password },
      fetchPolicy: 'no-cache'
    }).pipe(
      map((result: any) => {
        const data = result.data.login;
        this.token = data.token;
        localStorage.setItem('token', this.token);
        this.isAuthenticated.next(true);
        return data;
      }),
      catchError(err => {
        this.logout(); // Clear session on failure
        throw err;
      })
    );
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { username, email, password }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token = '';
    this.isAuthenticated.next(false);
  }
}
