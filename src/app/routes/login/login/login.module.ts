import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from '../login-page/login-page.component';
import { AppAuthModule } from '../../../components/auth/app-auth.module';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    AppAuthModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
