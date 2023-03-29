import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { LocalStorageConstants } from 'src/app/shared/constants/localStorage.constants';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';
import { FirebaseExerciseService } from 'src/app/shared/services/firebase-exercise.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public exercises: ExerciseDTO[] = [];
  public isLoading: boolean = false;

  constructor(
    private readonly exerciseService: FirebaseExerciseService,
    private readonly localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.loadExercises();
  }

  private async loadExercises(selectedDay?: string): Promise<void> {
    this.isLoading = true;

    const user: User = this.localStorageService.get(LocalStorageConstants.CurrentUser)!;

    if(!!selectedDay)
    {
      this.exercises = await this.exerciseService.getDaily(user.uid, selectedDay );
    }
    else {
      let today: string = new Date().toLocaleString('it-IT', {weekday:'long'}); 
      today = today.charAt(0).toUpperCase() + today.slice(1);
      selectedDay = today;
    }

    this.exercises = await this.exerciseService.getDaily(user.uid, selectedDay );

    this.isLoading = false;
  }

  public async onSelectDay(day: string) {
    this.localStorageService.set(LocalStorageConstants.SelectedDay, day);
    this.loadExercises(day);
  }

}
