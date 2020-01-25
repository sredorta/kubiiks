////////////////////////////////////////////////////////////////////////////////
// Includes all components related to auth
////////////////////////////////////////////////////////////////////////////////

import { NgModule, PLATFORM_ID, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';



//TODO Reduce list to the strict minimum used in common feature components
import {MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  //MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  //MatGridListModule,
  //MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  //MatNativeDateModule,
  MatPaginatorModule,
  //MatProgressBarModule,
  //MatProgressSpinnerModule,
  //MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  //MatSidenavModule,
  //MatSliderModule,
  //MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  //MatStepperModule,
  //MatTableModule,
  //MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  //MatTreeModule,
  //MatPaginatorIntl,
  //MatSnackBar,
  //MatDialogRef,
  //MatBottomSheetRef
} from '@angular/material';
import { KiiLanguageService} from 'src/app/services/kii-language.service';
import { TranslateService, TranslateModule, TranslateLoader, } from '@ngx-translate/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { RouterModule } from '@angular/router';
import { TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { KiiTranslateLoader } from '../common/utils/kii-translate-loader';
import { KiiTranslateLazyLoader } from '../common/utils/kii-translate-lazy-loader';
import { KiiLoginComponent } from './routes/kii-login/kii-login.component';
import { KiiCommonModule } from '../common/kii-common.module';
import { KiiAuthRoutingModule } from './kii-auth-routing.module';
import { KiiSignupComponent } from './routes/kii-signup/kii-signup.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    KiiCommonModule,
    KiiAuthRoutingModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: KiiTranslateLazyLoader.getFactory('auth'),
          deps: [HttpClient, TransferState,PLATFORM_ID, Injector]
      },
      isolate:false
    }),
    [  MatAutocompleteModule, //MATERIAL DESIGN
      MatBadgeModule,
      MatBottomSheetModule,
      MatButtonModule,
      //MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      //MatGridListModule,
      //MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      //MatNativeDateModule,
      MatPaginatorModule,
      //MatProgressBarModule,
      //MatProgressSpinnerModule,
      //MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      //MatSidenavModule,
      //MatSliderModule,
      //MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      //MatStepperModule,
      //MatTableModule,
      //MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      //MatTreeModule
    ],
  ],
  declarations: [
    LoginFormComponent,
    SignupFormComponent,
    KiiLoginComponent,
    KiiSignupComponent
  ],
  providers:[KiiLanguageService],
  exports:[
  ]
})
export class KiiAuthModule { }
/*
providers:[{provide:'cookieFactory', useFacory: cookieServiceFactory, deps:[PLATFORM_ID, Injector]}]
const cookieServiceFactory = (platformId: object, injector: Injector) => {
return isPlatformBrowser(platformId) ? injector.get(BrowserCookieService) : injector.get(ServerCookieService);};
*/