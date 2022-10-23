import { Component, Input } from '@angular/core';
import { ThemeType } from '@ant-design/icons-angular';

@Component({
    selector: 'app-icon-button',
    templateUrl: 'icon-button.component.html'
})

export class IconButtonComponent  {
    @Input() label!: string;
    @Input() icon!: string;
    @Input() theme!: ThemeType;
    @Input() spin: boolean | undefined;
    @Input() disabled: boolean | undefined;
    @Input() primary: boolean | undefined;
}