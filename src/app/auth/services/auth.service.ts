import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { IUser } from '../interfaces';
import { Observable, catchError, map, of, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl: string = environments.baseUrl + '/users';
  private _user?: IUser;

  constructor(private readonly _http: HttpClient) {}

  get currentUser(): IUser | undefined {
    if (!this._user) return undefined;
    return structuredClone(this._user);
  }

  login(email: string, password: string): Observable<IUser> {
    return this._http.get<IUser>(`${this._baseUrl}/1`).pipe(
      tap((user) => (this._user = user)),
      tap((user) => localStorage.setItem('token', user.id.toString()))
    );
  }

  checkAuthStatus(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this._http.get<IUser>(`${this._baseUrl}/1`)
      .pipe(
        tap(user => this._user = user),
        map(user => !!user),
        catchError(err => of(false))
      );
  }

  logout(): void {
    this._user = undefined;
    localStorage.removeItem('token');
  }
}
