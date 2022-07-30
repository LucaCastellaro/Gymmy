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

const components = [
  InputComponent,
  ConfirmButtonComponent,
  LoginComponent,
  RegistrationComponent,
  ConfirmMessageComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ZorroModule,
    SharedModule,
    ReactiveFormsModule,
    NzSpinModule
  ],
  providers: [],
  bootstrap: [],
  exports: components
})
export class ComponentsModule { }
