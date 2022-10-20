import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageConstants } from 'src/app/shared/constants/localStorage.constants';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';
import { Days, Today } from 'src/app/shared/models/enums/days.enum';
import { FirebaseExerciseService } from 'src/app/shared/services/firebase-exercise.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: 'add-exercise.component.html'
})
export class AddExerciseComponent {
  @Input() isDrawerOpen!: boolean;
  @Input() closeDrawer!: () => void;
  @Input() userId!: string;
  @Output() onAdd: EventEmitter<ExerciseDTO> = new EventEmitter<ExerciseDTO>();

  public form!: FormGroup;
  public isLoading: boolean = false;

  public readonly days: string[];
  public selectedDays!: string[];


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly exerciseService: FirebaseExerciseService,
    private readonly localStorageService: LocalStorageService
  ) {
    this.days = Object.keys(Days);
    
    this.form = this.formBuilder.group({
      name: formBuilder.control('', [Validators.required, Validators.maxLength(255)]),
      days: formBuilder.control([Today()], [Validators.required]),
      description: formBuilder.control('', [Validators.maxLength(255)]),
      link: formBuilder.control('', [Validators.maxLength(255)]),
    });
  }

  public async addExercise(): Promise<void>{
      this.isLoading = true;

      const user: User = this.localStorageService
          .get(LocalStorageConstants.CurrentUser)!;

      const model: ExerciseDTO = {
          userId: user!.uid,
          days: this.form.value['days'],
          descr: this.form.value['descr'] ?? '',
          link: this.form.value['link'] ?? '',
          series: [],
          title: this.form.value['name'],
          done: null,
          id: ''
      };

      this.onAdd.emit(await this.exerciseService.addExercise(model));
      this.isLoading = false;

      this.closeDrawer();
  }

}
