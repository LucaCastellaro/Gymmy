import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';
import { Days } from 'src/app/shared/models/enums/days.enum';
import { FirebaseExerciseService } from 'src/app/shared/services/firebase-exercise.service';

@Component({
    selector: 'app-exercise-list',
    templateUrl: 'exercise-list.component.html'
})

export class ExerciseListComponent implements OnInit {
    @Input() exercises!: ExerciseDTO[];
    @Input() isLoading!: boolean;

    @Output() onSelectDay: EventEmitter<string> = new EventEmitter<string>();

    public isDrawerOpen: boolean = false;
    public userId!: string;
    public days!: string[];
    public selectedDay!: string;

    constructor(
        private readonly exerciseService: FirebaseExerciseService,
        private readonly message: NzMessageService
    ) { }
    
    ngOnInit(): void {
        this.days = Object.keys(Days);
        this.selectedDay = this.days[new Date().getDay() - 1];
    }

    public openDrawer(): void {
        this.isDrawerOpen = true;
    }

    public addExercise(value: any){
        this.exercises.push(value);
    }

    public async markAllAsDone(): Promise<void> {
        for(let i = 0; i < this.exercises.length; i++) {
            this.exercises[i] = await this.exerciseService.markAsDone(this.exercises[i], true);
        }
    }

    public closeDrawer(): void {
        this.isDrawerOpen = false;
    }

    public deleteExercise(value: ExerciseDTO): void {
        this.exercises = this.exercises.filter(item => item.id != value.id);

        this.message.success(`${value.title.toUpperCase()} eliminato`)
    }

    public onSelect(value: string) {
        this.selectedDay = value;
        this.onSelectDay.emit(this.selectedDay);
    }
}