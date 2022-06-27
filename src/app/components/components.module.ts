import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputComponent } from './input/input.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const components = [
  InputComponent,
  RegistrationComponent,
  LoginComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule    
  ],
  providers: [],
  bootstrap: [],
  exports: components
})
export class ComponentsModule { }
