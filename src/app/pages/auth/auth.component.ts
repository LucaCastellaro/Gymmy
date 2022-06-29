import { Component } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';

@Component({
    selector: 'pages-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.less']
})

export class AuthComponent   {
    public isLogin: boolean = true;

    constructor() { }

    public flipCard(): void {
        this.isLogin = !this.isLogin;
        
        if(!this.isLogin) document.getElementsByClassName('flipping-card')[0].classList.add('flipped');
        else document.getElementsByClassName('flipping-card')[0].classList.remove('flipped');
    }
}