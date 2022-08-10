import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ZorroModule } from '../zorro/zorro.module';
import { ConfirmButtonComponent } from './confirm-button/confirmButton.component';
import { ConfirmMessageComponent } from './confirm-message/confirmMessage.component';
import { InputComponent } from './input/input.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component.';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseItemListComponent } from './exercise-item-list/exercise-item-list.component';

const components = [
  InputComponent,
  ConfirmButtonComponent,
  LoginComponent,
  RegistrationComponent,
  ConfirmMessageComponent,
  IconButtonComponent,
  ExerciseListComponent,
  ExerciseItemListComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ZorroModule,
    SharedModule,
    ReactiveFormsModule,
    NzToolTipModule,
    NzCardModule,
    NzListModule,
    NzButtonModule,
    NzSpinModule
  ],
  providers: [],
  bootstrap: [],
  exports: components
})
export class ComponentsModule { }
