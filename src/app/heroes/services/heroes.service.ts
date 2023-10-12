import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { IHero } from '../interfaces/hero.interfaces';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private readonly baseUrl: string = environments.baseUrl + '/heroes';

  constructor(private readonly _http: HttpClient) {}

  getHeroes(): Observable<Array<IHero>> {
    return this._http.get<Array<IHero>>(this.baseUrl);
  }

  getHeroById(id: string): Observable<IHero | undefined> {
    const url: string = `${this.baseUrl}/${id}`;
    return this._http
      .get<IHero | undefined>(url)
      .pipe(catchError((e) => of(undefined)));
  }

  getSugggestions(query: string): Observable<Array<IHero>> {
    return this._http.get<Array<IHero>>(`${this.baseUrl}?q=${query}&_limit=6`);
  }

  addHero(hero: IHero): Observable<IHero> {
    return this._http.post<IHero>(this.baseUrl, hero);
  }

  updateHero(hero: IHero): Observable<IHero> {
    if (!hero.id) throw Error('Hero id is required');
    return this._http.patch<IHero>(`${this.baseUrl}/${hero.id}`, hero);
  }

  deleteHeroById(id: string): Observable<boolean> {
    if (!id) throw Error('Hero id is required');
    return this._http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError((err) => of(false)),
      map((resp) => true)
    );
  }
}
