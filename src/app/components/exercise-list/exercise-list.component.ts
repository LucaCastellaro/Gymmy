import { Component, EventEmitter, Input } from '@angular/core';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';
import { FirebaseExerciseService } from 'src/app/shared/services/firebase-exercise.service';

@Component({
    selector: 'app-exercise-list',
    templateUrl: 'exercise-list.component.html'
})

export class ExerciseListComponent {
    @Input() exercises!: ExerciseDTO[];
    @Input() isLoading!: boolean;

    public isDrawerOpen: boolean = false;
    public userId!: string;

    public eventEmitter!: EventEmitter<ExerciseDTO>;

    constructor(
        private readonly exerciseService: FirebaseExerciseService
    ) {
     }

    public openDrawer(): void {
        this.isDrawerOpen = true;
    }

    public addExercise(value: any){
        this.exercises.push(value);
    }

    public async markAllAsDone(): Promise<void> {
        for(let i = 0; i < this.exercises.length; i++) {
            this.exercises[i] = await this.exerciseService.markAsDone(this.exercises[i], true);
        }
    }

    public closeDrawer(): void {
        this.isDrawerOpen = false;
        this.eventEmitter.unsubscribe();
    }
}