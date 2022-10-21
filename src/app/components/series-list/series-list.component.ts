import { Component, Input, OnInit } from '@angular/core';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
})
export class SeriesListComponent {

  @Input() exercise!: ExerciseDTO;

  constructor() { }
}
