////////////////////////////////////////////////////////////////////////////////
//Includes the minimal set of components required to show the main pages
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
import { TranslateService, TranslateModule, TranslateLoader, TranslateDirective } from '@ngx-translate/core';
import { KiiHeaderComponent } from './components/kii-header/kii-header.component';
import { KiiFooterComponent } from './components/kii-footer/kii-footer.component';
import { KiiToolbarComponent } from './components/kii-toolbar/kii-toolbar.component';
import { KiiPageComponent } from './components/kii-page/kii-page.component';
import { KiiLanguageSelectorComponent } from './components/kii-language-selector/kii-language-selector.component';
import { AppRoutingModule, routes } from 'src/app/app-routing.module';
import { HomeComponent } from 'src/app/routes/home/home.component';
import { KiiTranslateBrowserLoader } from './utils/kii-translate-browser-loader';
import { TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { KiiTranslateServerLoader } from './utils/kii-translate-server-loader';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

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
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: KiiTranslateServerLoader.getFactory('blog'),
          deps: [TransferState]
      }
    }),

  ],
  declarations: [
    HomeComponent,
    KiiHeaderComponent,
    KiiFooterComponent,
    KiiToolbarComponent,
    KiiPageComponent,
    KiiLanguageSelectorComponent,
  ],
  providers:[KiiLanguageService,TranslateService],
  exports:[
    HomeComponent,
    KiiPageComponent,
    KiiToolbarComponent
  ]
})
export class KiiCommonServerModule { }

