import { Component } from '@angular/core';

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
}
