import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeriesDTO } from 'src/app/shared/models/DTO/SeriesDTO';
import { FirebaseSeriesService } from 'src/app/shared/services/firebase-series.service';

@Component({
  selector: 'app-edit-series',
  templateUrl: './edit-series.component.html',
})
export class EditSeriesComponent implements OnInit {
  @Input() isDrawerOpen!: boolean;
  @Input() series!: SeriesDTO;

  @Output() onClose: EventEmitter<SeriesDTO | undefined> = new EventEmitter<SeriesDTO | undefined>();

  public form!: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly seriesService: FirebaseSeriesService
  ) { }
  
  ngOnInit(): void {
      this.form = this.formBuilder.group({
        reps: this.formBuilder.control(this.series?.reps ?? 0, [Validators.required, Validators.min(1)]),
        weight: this.formBuilder.control(this.series?.weight ?? 0, [Validators.required, Validators.min(1)]),
        pause: this.formBuilder.control(this.series?.pause ?? 0, [Validators.required]),
      });
  }

  public edit(): void {
    this.isLoading = true;

    const seriesToUpdate: SeriesDTO = {
      pause: this.form.value['pause'],
      reps: this.form.value['reps'],
      weight: this.form.value['weight'],
      exerciseId: this.series.exerciseId,
      id: this.series.id,
      userId: this.series.userId
    };

    this.seriesService.update(seriesToUpdate);

    this.onClose.emit(seriesToUpdate);

    this.isLoading = false;
  }

  public closeDrawer(): void {
    this.onClose.emit(undefined);
  }
}
