import { Component, Input, Output } from '@angular/core';

@Component({
    selector: 'app-input',
    templateUrl: 'input.component.html'
})

export class InputComponent {
    @Input() type: string = '';
    @Input() label: string = '';

    @Output() value: string = '';

    constructor() { }
}