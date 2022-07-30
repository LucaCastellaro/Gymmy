import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'pages-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.less']
})

export class AuthComponent implements OnInit, OnDestroy   {
    public isLogin: boolean = true;
    public registrationEmitter: EventEmitter<boolean>;
    public isRegistered: boolean = false;

    constructor() {
        this.registrationEmitter = new EventEmitter<boolean>(false);
    }
    
    ngOnDestroy(): void {
        this.registrationEmitter.unsubscribe();
    }

    ngOnInit(): void {
        this.registrationEmitter
            .subscribe(value => {
                this.isRegistered = value;
            });
    }

    public flipCard(): void {
        this.isLogin = !this.isLogin;
        
        if(!this.isLogin) document.getElementsByClassName('flipping-card')[0].classList.add('flipped');
        else document.getElementsByClassName('flipping-card')[0].classList.remove('flipped');
    }
}