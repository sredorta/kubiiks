import { NgModule, PLATFORM_ID, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from '../login-page/login-page.component';
import { KiiAuthModule } from 'src/app/_features/auth/kii-auth.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { KiiTranslateLoader } from 'src/app/_features/common/utils/kii-translate-loader';
import { HttpClient } from '@angular/common/http';
import { TransferState } from '@angular/platform-browser';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    KiiAuthModule,
    TranslateModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
