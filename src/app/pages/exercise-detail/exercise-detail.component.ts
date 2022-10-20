import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocalStorageConstants } from 'src/app/shared/constants/localStorage.constants';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';
import { FirebaseExerciseService } from 'src/app/shared/services/firebase-exercise.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';
import { User } from '@angular/fire/auth';
import { RoutesConstants } from 'src/app/shared/constants/routes.constants';
import { SeriesDTO } from 'src/app/shared/models/DTO/SeriesDTO';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
})
export class ExerciseDetailComponent implements OnInit {

  public exercise: ExerciseDTO = {} as ExerciseDTO;
  public isLoading: boolean = false;
  public isDrawerOpen: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly exerciseService: FirebaseExerciseService,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(async (params: Params) => {
      const user: User = this.localStorageService
          .get(LocalStorageConstants.CurrentUser)!;

      this.exercise = await this.exerciseService.getById(user.uid, params['exerciseId']);
      this.isLoading = false;
    });
  }

  public goToDashboard(){
      this.router.navigate([RoutesConstants.Dashboard])
  }

  public openDrawer(){
    this.isDrawerOpen = true;
  }

  public closeDrawer(): void {
    this.isDrawerOpen = false;
  }

  public addSeries(value: SeriesDTO[]): void {
    this.exercise.series = value;
  }

  public calculateSeriesTotalWeight(series: SeriesDTO): number {
    return series.reps * series.weight;
  }

  public calculateExerciseTotalWeight(): number {
    return this.exercise.series
      .map(item => item.reps * item.weight)
      .reduce((acc, curr) => acc += curr);
  }
}
