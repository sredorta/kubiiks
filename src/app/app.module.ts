import { BrowserModule, TransferState, StateKey, makeStateKey, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, Inject, PLATFORM_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { HomeComponent } from './routes/home/home.component';
import { KiiStateTransferService } from './services/kii-state-transfer.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { KiiTranslateHttpLoader } from './utils/kii-translate-http-loader';

import { DeviceDetectorService } from 'ngx-device-detector';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { KiiTranslateBrowserLoader } from './features/common/utils/kii-translate-browser-loader';
import { AppCommonModule } from './features/common/app-common.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    AppCommonModule,
    //NGX-TRANSLATE PART
    HttpClientModule,
    TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: KiiTranslateBrowserLoader.getFactory(),
              deps: [HttpClient, TransferState]
          }
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [DeviceDetectorService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(transfer : KiiStateTransferService) {
      transfer.scroll(); //Handle scroll when transfer server/browser
  }
 }

