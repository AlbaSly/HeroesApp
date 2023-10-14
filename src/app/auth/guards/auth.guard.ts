import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {}

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this._authService.checkAuthStatus().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) this._router.navigate(['./auth/login']);
      })
    );
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    // console.log("canMatch");
    // console.log({route, segments});
    return this.checkAuthStatus();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    // console.log("canActivate");
    // console.log({route, state});
    return this.checkAuthStatus();
  }
}
