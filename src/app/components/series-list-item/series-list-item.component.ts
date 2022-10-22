import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SeriesDTO } from 'src/app/shared/models/DTO/SeriesDTO';

@Component({
  selector: 'app-series-list-item',
  templateUrl: './series-list-item.component.html',
})
export class SeriesListItemComponent {

  public isDrawerOpen: boolean = false;
  public done: boolean = false;

  @Input() series!: SeriesDTO;
  @Input() index!: number;

  @Output() onEdit: EventEmitter<SeriesDTO> = new EventEmitter<SeriesDTO>();

  constructor(
    private readonly message: NzMessageService,  ) { }

  public get title(): string {
    return `Serie ${this.index + 1}`;
  }

  public get totalWeight(): number {
    return this.series.reps * this.series.weight;
  }

  public openDrawer(): void {
    this.isDrawerOpen = true;
  }

  editSeries(value: SeriesDTO | undefined): void {
    this.isDrawerOpen = false;

    if(value) {
      this.onEdit.emit(value);
      this.message.success('Serie aggiornata.');
    }
  }

}
