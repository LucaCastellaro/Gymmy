import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from 'src/app/shared/constants/routes.constants';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';

@Component({
    selector: 'app-exercise-list',
    templateUrl: 'exercise-list.component.html'
})

export class ExerciseListComponent {
    @Input() exercises!: ExerciseDTO[];
    @Input() isLoading!: boolean;

    constructor(private readonly router: Router) { }

    public addExercise(): void {
        this.router.navigate([RoutesConstants.AddExercise]);
    }
}