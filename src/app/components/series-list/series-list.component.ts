import { Component, Input, OnInit } from '@angular/core';
import { ExerciseDTO, KeyValuePair } from 'src/app/shared/models/DTO/ExerciseDTO';
import { SeriesDTO } from 'src/app/shared/models/DTO/SeriesDTO';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
})
export class SeriesListComponent {
  @Input() exercise!: ExerciseDTO;

  constructor( ) { }

  public async editSeries(value: SeriesDTO): Promise<void> {
    this.exercise.series[value.id] = value;
  }

  public get hasSeries(): boolean {
    return this.exercise.series
      && Object.keys(this.exercise.series).length > 0;
  }

  public get keys(): string[] {
    return Object.keys(this.exercise.series);
  }

  public deleteSeries(value: SeriesDTO): void {
    const newSeries: KeyValuePair<SeriesDTO> = {} as KeyValuePair<SeriesDTO>;

    for(const key of Object.keys(this.exercise.series)){
      if(key != value.id) newSeries[key] = this.exercise.series[key];
    }
    
    this.exercise.series = newSeries;
  }
}
