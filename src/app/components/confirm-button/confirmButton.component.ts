import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-confirm-button',
    templateUrl: 'confirmButton.component.html'
})

export class ConfirmButtonComponent {
    @Input() label: string = '';

    constructor() { }
}