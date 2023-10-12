import { Component, OnInit } from '@angular/core';
import { IHero } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  public heroes: Array<IHero> = [];

  constructor(
    private readonly _heroesService: HeroesService,
  ) {}

  ngOnInit(): void {
    this._heroesService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
