import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesLayoutComponent } from './layouts/heroes-layout/heroes-layout.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesLayoutComponent,
    children: [
      {
        path: 'new',
        component: NewPageComponent,
      },
      {
        path: 'list',
        component: ListPageComponent,
      },
      {
        path: 'search',
        component: SearchPageComponent,
      },
      {
        path: 'edit/:id',
        component: EditPageComponent,
      },
      {
        path: 'view/:id',
        component: HeroPageComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
