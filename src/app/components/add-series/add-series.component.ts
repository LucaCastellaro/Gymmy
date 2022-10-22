import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeriesDTO } from 'src/app/shared/models/DTO/SeriesDTO';
import { FirebaseSeriesService } from 'src/app/shared/services/firebase-series.service';

@Component({
  selector: 'app-add-series',
  templateUrl: './add-series.component.html'
})
export class AddSeriesComponent {
  @Input() isDrawerOpen!: boolean;
  @Input() userId!: string;
  @Input() exerciseId!: number;
  @Output() onAdd: EventEmitter<SeriesDTO> = new EventEmitter<SeriesDTO>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  public seriesForm!: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly seriesService: FirebaseSeriesService
  ) { 
    this.seriesForm = this.formBuilder.group({
      reps: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
      weight: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
      pause: this.formBuilder.control(0, [Validators.required]),
    });
  }

  public async addSeries(): Promise<void> {
    this.isLoading = true;

    const newSeries: SeriesDTO = {
      pause: this.seriesForm.value['pause'],
      reps: this.seriesForm.value['reps'],
      weight: this.seriesForm.value['weight'],
      id: '',
      exerciseId: this.exerciseId,
      userId: this.userId
    };

    await this.seriesService.add(this.userId, this.exerciseId, newSeries);

    this.onAdd.emit(newSeries);

    this.isLoading = false;

    this.closeDrawer();
  }

  public closeDrawer(): void {
    this.onClose.emit();
  }

}
