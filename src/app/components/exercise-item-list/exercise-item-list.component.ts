import { Component, Input, OnInit } from '@angular/core';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';
import { FirebaseExerciseService } from 'src/app/shared/services/firebase-exercise.service';

@Component({
    selector: 'app-exercise-item-list',
    templateUrl: 'exercise-item-list.component.html'
})

export class ExerciseItemListComponent implements OnInit {
    @Input() exercise!: ExerciseDTO;

    constructor(private readonly exerciseService: FirebaseExerciseService) { }

    ngOnInit() { }

    public async markAsDone(done: boolean): Promise<void> {
        this.exercise = await this.exerciseService.markAsDone(this.exercise, done);
    }

    public get isDone(): boolean {
        return this.exerciseService.isDone(this.exercise);
    }
}