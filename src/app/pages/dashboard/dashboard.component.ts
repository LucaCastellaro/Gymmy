import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { LocalStorageConstants } from 'src/app/shared/constants/localStorage.constants';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';
import { Days } from 'src/app/shared/models/enums/days.enum';
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

  private async loadExercises(): Promise<void> {
    this.isLoading = true;

    const user: User = this.localStorageService
        .get(LocalStorageConstants.CurrentUser)!;

    // TODO: Dare la possibilità di caricare giorno successivo?
    let today: string = new Date().toLocaleString('it-IT', {weekday:'long'}); 
    today = today.charAt(0).toUpperCase() + today.slice(1);
    this.exercises = await this.exerciseService.getDaily(user.uid, Days[today as unknown as Days]);

    console.debug(this.exercises)

    this.isLoading = false;
  }

}
