import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SeriesDTO } from 'src/app/shared/models/DTO/SeriesDTO';
import { FirebaseSeriesService } from 'src/app/shared/services/firebase-series.service';

@Component({
  selector: 'app-series-list-item',
  templateUrl: './series-list-item.component.html',
})
export class SeriesListItemComponent {

  public waitingForPauseToStop: boolean = false;
  public isInPause: boolean = false;
  public isDrawerOpen: boolean = false;
  public done: boolean = false;

  @Input() userId!: string;
  @Input() exerciseId!: string;
  @Input() series!: SeriesDTO;
  @Input() index!: number;

  @Output() onEdit: EventEmitter<SeriesDTO> = new EventEmitter<SeriesDTO>();
  @Output() onDelete: EventEmitter<SeriesDTO> = new EventEmitter<SeriesDTO>();

  constructor(
    private readonly message: NzMessageService,
    private readonly seriesService: FirebaseSeriesService 
  ) { }

  public get title(): string {
    return `Serie ${this.index + 1}`;
  }

  public get totalWeight(): number {
    return this.series.reps * this.series.weight;
  }

  public async delete(): Promise<void> {
    var isDeleted = await this.seriesService.delete(this.series);
    if(!isDeleted) {
      this.message.error('La serie non è stata eliminata. Riprova tra qualche minuto.');
      return;
    }

    this.onDelete.emit(this.series)

    this.message.success('Serie eliminata.');
  }

  public openDrawer(): void {
    this.isDrawerOpen = true;
  }

  public editSeries(value: SeriesDTO | undefined): void {
    this.isDrawerOpen = false;

    if(value) {
      this.onEdit.emit(value);
      this.message.success('Serie aggiornata.');
    }
  }

  public startPause(): void {
    this.isInPause = true;
    setTimeout(() => {
      this.isInPause = false;
      this.waitingForPauseToStop = true;
    }, this.series.pause * 1000);
  }

  public endPause(): void {
    this.waitingForPauseToStop = false;
    this.message.info(`Fine pause per serie ${this.index + 1}`);
  }
}