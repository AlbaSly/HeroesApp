import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { IHero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss'],
})
export class HeroPageComponent implements OnInit {
  public hero?: IHero;

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(switchMap(({ id }) => this._heroesService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this._router.navigate(['/heroes/list']);

        this.hero = hero;
        return;
      });
  }

  goBack(): void {
    this._router.navigateByUrl("/heroes/list");
  }
}
