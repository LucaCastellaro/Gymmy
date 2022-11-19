import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ZorroModule } from '../zorro/zorro.module';
import { ConfirmButtonComponent } from './confirm-button/confirmButton.component';
import { ConfirmMessageComponent } from './confirm-message/confirmMessage.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component.';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { AddSeriesComponent } from './add-series/add-series.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesListItemComponent } from './series-list-item/series-list-item.component';
import { ExerciseListItemComponent } from './exercise-list-item/exercise-list-item.component';
import { EditSeriesComponent } from './edit-series/edit-series.component';
import { EditExerciseComponent } from './edit-exercise/edit-exercise.component';
import { SeriesDetailsComponent } from './series-details/series-details.component';
import { DropdownComponent } from './dropdown/dropdown.component';

const components = [
  ConfirmButtonComponent,
  LoginComponent,
  RegistrationComponent,
  ConfirmMessageComponent,
  IconButtonComponent,
  ExerciseListComponent,
  ExerciseListItemComponent,
  AddSeriesComponent,
  AddExerciseComponent,
  CancelButtonComponent,
  SeriesListComponent,
  SeriesListItemComponent,
  EditSeriesComponent,
  EditExerciseComponent,
  SeriesDetailsComponent,
  DropdownComponent
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
