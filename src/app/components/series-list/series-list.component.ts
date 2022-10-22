import { Component, Input, OnInit } from '@angular/core';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';
import { SeriesDTO } from 'src/app/shared/models/DTO/SeriesDTO';
import { FirebaseExerciseService } from 'src/app/shared/services/firebase-exercise.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
})
export class SeriesListComponent {
  @Input() exercise!: ExerciseDTO;

  constructor(
    private readonly exerciseService: FirebaseExerciseService
  ) { }

  public async editSeries(value: SeriesDTO, seriesIndex: number): Promise<void> {
    this.exercise.series[seriesIndex] = value;

    await this.exerciseService.updateExercise(this.exercise);
  }
}
