import { Component, Input, OnInit } from '@angular/core';
import { IHero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{

  @Input() public hero!: IHero;

  ngOnInit(): void {
      if (!this.hero) throw Error("Hero property is required");
  }
}
