import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-exercise-numbers',
    templateUrl: 'exercise-numbers.component.html'
})

export class ExerciseNumbersComponent {
    @Input() title!: string;
    @Input() value!: number;

    constructor() { }

}