import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-heroes-layout',
  templateUrl: './heroes-layout.component.html',
  styleUrls: ['./heroes-layout.component.scss']
})
export class HeroesLayoutComponent {

  public sidebarItems = [
    {
      label: 'Listado', icon: 'label', url: './list'
    },
    {
      label: 'Añadir', icon: 'add', url: './new'
    },
    {
      label: 'Buscar', icon: 'search', url: './search'
    }
  ]

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
  ) {}

  get user(): IUser | undefined {
    return this._authService.currentUser;
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/auth']);
  }
}
