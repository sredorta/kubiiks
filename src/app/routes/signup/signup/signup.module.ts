import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupPageComponent } from '../signup-page/signup-page.component';
import { KiiAuthModule } from 'src/app/_features/auth/kii-auth.module';


@NgModule({
  declarations: [SignupPageComponent],
  imports: [
    CommonModule,
    KiiAuthModule,
    SignupRoutingModule
  ]
})
export class SignupModule { }
