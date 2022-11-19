import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-dropdown',
    templateUrl: 'dropdown.component.html'
})

export class DropdownComponent implements OnInit {
    @Input() values!: string[];
    @Input() preSelected?: string;
    public selectedValue!: string;
    @Output() onSelect: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit() { 
        if(!!this.preSelected) this.selectedValue = this.preSelected;
        else this.selectedValue = this.values[0];

        this.onSelect.emit(this.selectedValue);
    }

    public selectValue(event: any) {
        this.selectedValue = event.target.textContent;
        this.onSelect.emit(this.selectedValue);
    }
}