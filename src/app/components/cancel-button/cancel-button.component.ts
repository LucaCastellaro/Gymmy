import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-cancel-button',
    templateUrl: 'cancel-button.component.html'
})

export class CancelButtonComponent {
    @Input() label!: string;
    @Input() isDisabled: boolean = false;
    @Input() showLoader?: boolean | null;

    constructor() { 
    }
}