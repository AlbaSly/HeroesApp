import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

export const hasSessionGuard: CanActivateFn = (route, state) => {
  return hasSession();
};

function hasSession(): boolean | Observable<boolean> {
  const _router = inject(Router);
  const _authService = inject(AuthService);

  return _authService.checkAuthStatus().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) _router.navigate(['./heroes']);
      return true;
    })
  );
}