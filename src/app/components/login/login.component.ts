import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesConstants } from 'src/app/shared/constants/routes.constants';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    public form!: FormGroup;
    public isLoading: boolean = false;
    
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly firebaseService: FirebaseService,
        private readonly router: Router
    ) {
        this.form = this.formBuilder.group({
            email: formBuilder.control('', [Validators.required, Validators.email]),
            password: formBuilder.control('', [Validators.required]),
        });
    }

    public async signIn(){
        try{
            await this.firebaseService.signIn(this.form.value.email, this.form.value.password);
            this.router.navigate([RoutesConstants.Dashboard]);

        }
        catch(ex){
            throw ex;
        }
    }
}