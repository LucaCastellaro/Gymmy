import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ZorroModule } from '../zorro/zorro.module';
import { ConfirmButtonComponent } from './confirm-button/confirmButton.component';
import { InputComponent } from './input/input.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component.';

const components = [
  InputComponent,
  ConfirmButtonComponent,
  LoginComponent,
  RegistrationComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ZorroModule
  ],
  providers: [],
  bootstrap: [],
  exports: components
})
export class ComponentsModule { }
