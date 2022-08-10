import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-exercise-item-list',
    templateUrl: 'exercise-item-list.component.html'
})

export class ExerciseItemListComponent implements OnInit {
    @Input() exercise!: any;

    constructor() { }

    ngOnInit() { }
}