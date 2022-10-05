import { Component, Input, OnInit } from '@angular/core';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';

@Component({
    selector: 'app-exercise-item-list',
    templateUrl: 'exercise-item-list.component.html'
})

export class ExerciseItemListComponent implements OnInit {
    @Input() exercise!: ExerciseDTO;

    constructor() { }

    ngOnInit() { }
}