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

  constructor(
    private readonly exerciseService: FirebaseExerciseService,
    private readonly localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.loadExercises();
  }

  async loadExercises(): Promise<void> {
    const user: User = this.localStorageService
        .get(LocalStorageConstants.CurrentUser)!;

    this.exercises = await this.exerciseService.getByUser(user.uid);
  }

}
