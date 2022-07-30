import { Component, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
    selector: 'app-registration',
    templateUrl: 'registration.component.html'
})

export class RegistrationComponent {
    @Input() registrationEmitter!: EventEmitter<boolean>;

    public form!: FormGroup;
    public isLoading: boolean = false;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly firebaseService: FirebaseService
    ) {
        this.form = this.formBuilder.group({
            firstName: formBuilder.control('', [Validators.required, Validators.maxLength(50)]),
            lastName: formBuilder.control('', [Validators.required, Validators.maxLength(50)]),
            email: formBuilder.control('', [Validators.required, Validators.maxLength(100), Validators.email]),
            emailConfirm: formBuilder.control('', [Validators.required, Validators.maxLength(100), Validators.email]),
            password: formBuilder.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
            confirmPassword: formBuilder.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
        });
    }

    public async signUp(): Promise<void> {
        if(!this.form.valid) return;

        if(this.form.controls['password'].value !== this.form.controls['confirmPassword'].value) {
            alert("Le password non combaciano.")
            return;
        }

        if(this.form.value.email !== this.form.value.emailConfirm) {
            alert("Le mail non combaciano.")
            return;
        }

        let result = false;
        try{
            this.isLoading = true;
            await this.firebaseService.createUser({
                email: this.form.value.email,
                firstName: this.form.value.firstName,
                lastName: this.form.value.lastName,
                password: this.form.value.password,
            });
            result = true;
        }
        catch(ex){
            result = false;
            console.error(ex);
        }
        finally{
            this.isLoading = false;
            this.registrationEmitter.emit(result);
        }
    }
}