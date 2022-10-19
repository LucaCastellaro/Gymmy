import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';
import { FirebaseExerciseService } from 'src/app/shared/services/firebase-exercise.service';
import {RoutesConstants} from "../../shared/constants/routes.constants";

@Component({
    selector: 'app-exercise-item-list',
    templateUrl: 'exercise-item-list.component.html'
})

export class ExerciseItemListComponent implements OnInit {
    @Input() exercise!: ExerciseDTO;

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
}