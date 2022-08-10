import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
    selector: 'app-add-exercise',
    templateUrl: 'add-exercise.component.html'
})

export class AddExerciseComponent {
    public form!: FormGroup;
    public isLoading: boolean = false;
    
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly firebaseService: FirebaseService,
        private readonly router: Router) {
            this.form = this.formBuilder.group({
                name: formBuilder.control('', [Validators.required]),
            });
         }

    public add(): void{}
}