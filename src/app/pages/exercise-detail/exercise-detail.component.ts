import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LocalStorageConstants } from 'src/app/shared/constants/localStorage.constants';
import { ExerciseDTO } from 'src/app/shared/models/DTO/ExerciseDTO';
import { FirebaseExerciseService } from 'src/app/shared/services/firebase-exercise.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
})
export class ExerciseDetailComponent implements OnInit {

  public exercise?: ExerciseDTO;
  public isLoading: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly exerciseService: FirebaseExerciseService,
    private readonly localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(async (params: Params) => {

      const user: User = this.localStorageService
          .get(LocalStorageConstants.CurrentUser)!;

      this.exercise = await this.exerciseService.getById(user.uid, params['exerciseId']);
      this.isLoading = false;
    });
  }

}
