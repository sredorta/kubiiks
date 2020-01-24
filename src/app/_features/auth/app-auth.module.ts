////////////////////////////////////////////////////////////////////////////////
// Includes all components related to auth
////////////////////////////////////////////////////////////////////////////////

import { NgModule } from '@angular/core';
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
import { TranslateService, } from '@ngx-translate/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
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
    SignupFormComponent
  ],
  providers:[KiiLanguageService],
  exports:[
    LoginFormComponent,
    SignupFormComponent,
  ]
})
export class AppAuthModule { }
