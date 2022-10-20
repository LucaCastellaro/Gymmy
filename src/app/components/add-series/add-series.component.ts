import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeriesDTO } from 'src/app/shared/models/DTO/SeriesDTO';
import { FirebaseExerciseService } from 'src/app/shared/services/firebase-exercise.service';

@Component({
  selector: 'app-add-series',
  templateUrl: './add-series.component.html'
})
export class AddSeriesComponent {
  @Input() isDrawerOpen!: boolean;
  @Input() closeDrawer!: () => void;
  @Input() userId!: string;
  @Input() exerciseId!: string;

  public seriesForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly exerciseService: FirebaseExerciseService
  ) { 
    console.debug(this.userId);
    console.debug(this.exerciseId);

    this.seriesForm = this.formBuilder.group({
      reps: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
      weight: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
      pause: this.formBuilder.control(0, [Validators.required]),
    });
  }

  public addSeries(): void {
    console.debug('insert series');

    this.exerciseService.addSeries(this.userId, this.exerciseId, {
      pause: this.seriesForm.value['pause'],
      reps: this.seriesForm.value['reps'],
      weight: this.seriesForm.value['weight'],
    } as SeriesDTO);

    this.closeDrawer();
  }

}
