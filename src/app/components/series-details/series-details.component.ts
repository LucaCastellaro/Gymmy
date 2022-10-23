import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-series-details',
    templateUrl: 'series-details.component.html'
})

export class SeriesDetailsComponent {
    @Input() title!: string;
    @Input() showDivider: boolean | undefined;
    @Input() value: number | undefined;

    constructor() { }

}