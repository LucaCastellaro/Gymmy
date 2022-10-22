import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageConstants } from 'src/app/shared/constants/localStorage.constants';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';
import { Days } from 'src/app/shared/models/enums/days.enum';
import { FirebaseExerciseService } from 'src/app/shared/services/firebase-exercise.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: 'edit-exercise.component.html'
})
export class EditExerciseComponent implements OnInit {
  @Input() isDrawerOpen!: boolean;
  @Input() exercise!: ExerciseDTO;

  @Output() onEdit: EventEmitter<ExerciseDTO> = new EventEmitter<ExerciseDTO>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  public form!: FormGroup;
  public isLoading: boolean = false;

  public days!: string[];
  public selectedDays!: string[];


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly exerciseService: FirebaseExerciseService,
    private readonly localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.days = Object.keys(Days);

    this.selectedDays = this.exercise.days;
    
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(this.exercise.title, [Validators.required, Validators.maxLength(255)]),
      days: this.formBuilder.control(this.exercise.days, [Validators.required]),
      description: this.formBuilder.control(this.exercise.descr, [Validators.maxLength(255)]),
      link: this.formBuilder.control(this.exercise.link, [Validators.maxLength(255)]),
    });
  }

  public async editExercise(): Promise<void>{
      this.isLoading = true;

      const user: User = this.localStorageService
          .get(LocalStorageConstants.CurrentUser)!;

      const model: ExerciseDTO = {
          userId: this.exercise.userId,
          days: this.form.value['days'],
          descr: this.form.value['descr'] ?? '',
          link: this.form.value['link'] ?? '',
          series: this.exercise.series,
          title: this.form.value['name'],
          done: this.exercise.done,
          id: this.exercise.id
      };

      this.onEdit.emit(await this.exerciseService.update(model));
      this.isLoading = false;

      this.closeDrawer();
  }

  public closeDrawer(): void {
    this.onClose.emit();
  }

}
