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
    public selectedDays!: string[];

    public readonly days: string[] = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
    
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly firebaseService: FirebaseService,
        private readonly router: Router) {
            this.form = this.formBuilder.group({
                name: formBuilder.control('', [Validators.required, Validators.maxLength(255)]),
                series: formBuilder.control('', [Validators.required, Validators.min(0), Validators.max(255)]),
                reps: formBuilder.control('', [Validators.required, Validators.min(0), Validators.max(255)]),
                weight: formBuilder.control('', [Validators.required, Validators.min(0), Validators.max(255)]),
                pauseSeconds: formBuilder.control('', [Validators.required, Validators.min(0), Validators.max(255)]),
                days: formBuilder.control('', [Validators.required]),
                description: formBuilder.control('', [Validators.maxLength(255)]),
                link: formBuilder.control('', [Validators.maxLength(255)]),
            });
         }

    public add(): void{}
}