import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IHero, Publisher } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../componentes/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss'],
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl(''),
    publisher: new FormControl<Publisher>(Publisher.MarvelComics, {
      nonNullable: true,
    }),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _materialSnackbar: MatSnackBar,
    private readonly _heroesService: HeroesService,
    private readonly _materialDialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this._router.url.includes('edit')) return;

    this._activatedRoute.params
      .pipe(switchMap(({ id }) => this._heroesService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this._router.navigateByUrl('/');

        this.heroForm.reset(hero);
        return;
      });
  }

  public get currentHero(): IHero {
    const hero = this.heroForm.value as IHero;

    return hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this._heroesService.updateHero(this.currentHero).subscribe((hero) => {
        this.showSnackbar(`El héroe ${hero.superhero} ha sido modificado`);
      });
    } else {
      this._heroesService.addHero(this.currentHero).subscribe((hero) => {
        this._router.navigate(['/heroes/edit', hero.id]);
        this.showSnackbar(`El héroe ${hero.superhero} ha sido creado`);
      });
    }
  }

  onDeleteHero(): void {
    if (!this.currentHero.id) return;

    const dialogRef = this._materialDialog.open(ConfirmDialogComponent, {
      data: this.currentHero,
    });

    dialogRef
      .afterClosed()
      .pipe(
        /**
         * Filtro que deja pasar solamente si el dialog fue hecho click en si (que sea true)
         * (Revisar en ConfirmDialogComponente lo que devuelve (un booleano))
         * */
        filter((result: boolean) => result),
        /**
         * Ahora realizamos la llamada al servicio
         */
        switchMap(() =>
          this._heroesService.deleteHeroById(this.currentHero.id)
        ),
        /**Finalmente, dentro del servicio si el booleano da true (se eliminó), dejar pasar al subscribe */
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe((result) => {
        this.showSnackbar('El héroe ha sido borrado');
        this._router.navigate(['/heroes']);
      });
  }

  showSnackbar(message: string): void {
    this._materialSnackbar.open(message, 'done', {
      duration: 3000,
    });
  }
}