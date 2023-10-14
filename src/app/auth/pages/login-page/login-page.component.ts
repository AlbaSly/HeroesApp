import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
  ) {}

  onLogin(): void {
    this._authService.login("cheems@gmail.com", "1234")
      .subscribe(user => {
        this._router.navigate(['/heroes']);
      });
  }
}
