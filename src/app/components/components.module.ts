import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ZorroModule } from '../zorro/zorro.module';
import { ConfirmButtonComponent } from './confirm-button/confirmButton.component';
import { ConfirmMessageComponent } from './confirm-message/confirmMessage.component';
import { InputComponent } from './input/input.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component.';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseItemListComponent } from './exercise-item-list/exercise-item-list.component';
import { AddSeriesComponent } from './add-series/add-series.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';

const components = [
  InputComponent,
  ConfirmButtonComponent,
  LoginComponent,
  RegistrationComponent,
  ConfirmMessageComponent,
  IconButtonComponent,
  ExerciseListComponent,
  ExerciseItemListComponent,
  AddSeriesComponent,
  AddExerciseComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ZorroModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [],
  exports: components
})
export class ComponentsModule { }
