import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from 'src/app/shared/constants/routes.constants';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';
import { FirebaseExerciseService } from 'src/app/shared/services/firebase-exercise.service';

@Component({
    selector: 'app-exercise-list',
    templateUrl: 'exercise-list.component.html'
})

export class ExerciseListComponent {
    @Input() exercises!: ExerciseDTO[];
    @Input() isLoading!: boolean;

    constructor(
        private readonly router: Router,
        private readonly exerciseService: FirebaseExerciseService
    ) { }

    public addExercise(): void {
        this.router.navigate([RoutesConstants.AddExercise]);
    }

    public async markAllAsDone(): Promise<void> {
        for(let i = 0; i < this.exercises.length; i++) {
            this.exercises[i] = await this.exerciseService.markAsDone(this.exercises[i], true);
        }
    }
}