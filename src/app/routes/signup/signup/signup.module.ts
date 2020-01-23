import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupPageComponent } from '../signup-page/signup-page.component';


@NgModule({
  declarations: [SignupPageComponent],
  imports: [
    CommonModule,
    SignupRoutingModule
  ]
})
export class SignupModule { }
