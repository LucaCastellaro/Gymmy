import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from 'src/app/shared/constants/routes.constants';

@Component({
    selector: 'app-exercise-list',
    templateUrl: 'exercise-list.component.html'
})

export class ExerciseListComponent {
    @Input() exercises!: any[];

    constructor(private readonly router: Router) { }

    public addExercise(): void {
        this.router.navigate([RoutesConstants.AddExercise]);
    }
}