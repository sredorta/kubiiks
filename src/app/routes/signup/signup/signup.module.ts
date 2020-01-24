import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupPageComponent } from '../signup-page/signup-page.component';
import { AppAuthModule } from 'src/app/features/auth/app-auth.module';


@NgModule({
  declarations: [SignupPageComponent],
  imports: [
    CommonModule,
    AppAuthModule,
    SignupRoutingModule
  ]
})
export class SignupModule { }
