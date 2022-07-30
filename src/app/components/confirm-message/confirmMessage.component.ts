import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-confirm-message',
    templateUrl: 'confirmMessage.component.html'
})

export class ConfirmMessageComponent {
    @Input() label!: string;

    constructor() { 
    }
}