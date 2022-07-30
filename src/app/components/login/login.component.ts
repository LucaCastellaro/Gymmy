import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        private readonly firebaseService: FirebaseService
    ) {
        this.form = this.formBuilder.group({
            email: formBuilder.control('', [Validators.required, Validators.email]),
            password: formBuilder.control('', [Validators.required]),
        });
    }

    public async signIn(){
        await this.firebaseService.signIn(this.form.value.email, this.form.value.password);
    }
}