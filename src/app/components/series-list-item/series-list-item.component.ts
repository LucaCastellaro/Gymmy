import { Component, Input, OnInit } from '@angular/core';
import { SeriesDTO } from 'src/app/shared/models/DTO/SeriesDTO';

@Component({
  selector: 'app-series-list-item',
  templateUrl: './series-list-item.component.html',
})
export class SeriesListItemComponent implements OnInit {

  @Input() series!: SeriesDTO;
  @Input() index!: number;

  constructor() { }

  ngOnInit(): void {
  }

  public get title(): string {
    return `Serie ${this.index + 1}`;
  }

  public get totalWeight(): number {
    return this.series.reps * this.series.weight;
  }

}
