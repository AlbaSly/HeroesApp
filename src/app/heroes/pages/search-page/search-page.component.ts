import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IHero } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Array<IHero> = [];
  public selectedHero: IHero | null = null;

  constructor(
    private readonly _heroesService: HeroesService,
  ) {}

  searchHero(): void {
    const value: string = this.searchInput.value || '';

    this._heroesService.getSugggestions(value).subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  onSelectedOption($event: MatAutocompleteSelectedEvent): void {
    if (!$event.option.value) {
      this.selectedHero = null;
      return;
    }

    const hero: IHero = $event.option.value;
    this.selectedHero = hero;
    this.searchInput.setValue(hero.superhero);
  }
}
