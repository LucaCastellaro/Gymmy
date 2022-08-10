import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-exercise-list',
    templateUrl: 'exercise-list.component.html'
})

export class ExerciseListComponent {
    @Input() exercises!: any[];

    constructor() { }

    public addExercise(): void {
        console.log('ciao');
    }
}