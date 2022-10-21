import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';
import { FirebaseExerciseService } from 'src/app/shared/services/firebase-exercise.service';
import { RoutesConstants } from "../../shared/constants/routes.constants";

@Component({
    selector: 'app-exercise-list-item',
    templateUrl: 'exercise-list-item.component.html'
})

export class ExerciseListItemComponent implements OnInit {
    @Input() exercise!: ExerciseDTO;
    @Output() onDelete: EventEmitter<ExerciseDTO> = new EventEmitter<ExerciseDTO>();

    constructor(
        private readonly exerciseService: FirebaseExerciseService,
        private readonly router: Router
    ) { }

    ngOnInit() { }

    public async markAsDone(done: boolean): Promise<void> {
        this.exercise = await this.exerciseService.markAsDone(this.exercise, done);
    }

    public get isDone(): boolean {
        return this.exerciseService.isDone(this.exercise);
    }

    public async goToDetails(): Promise<void> {
        await this.router.navigate([RoutesConstants.ExerciseDetail, this.exercise.id]);
    }

    public async delete(): Promise<void> {
        const deleted = await this.exerciseService.deleteExercise(this.exercise);

        this.onDelete.emit(deleted);
    }
}