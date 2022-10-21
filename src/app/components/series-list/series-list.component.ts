import { Component, Input, OnInit } from '@angular/core';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';
import { SeriesDTO } from 'src/app/shared/models/DTO/SeriesDTO';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
})
export class SeriesListComponent implements OnInit {

  @Input() exercise!: ExerciseDTO;

  constructor() { }

  ngOnInit(): void {
  }

  public getTitle(index: number): string {
    return `Serie ${index + 1}`;
  }

  public calculateTotalWeight(series: SeriesDTO): number {
    return series.reps * series.weight;
  }

}
