////////////////////////////////////////////////////////////////////////////////
//Includes the minimal set of components required to show the main pages
////////////////////////////////////////////////////////////////////////////////

import { NgModule, PLATFORM_ID, Injector, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

//TODO Reduce list to the strict minimum used in common feature components
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatListModule,
  MatMenuModule,
  MatRippleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
  MatDividerModule,
} from '@angular/material';
import { KiiHeaderComponent } from './components/kii-header/kii-header.component';
import { KiiFooterComponent } from './components/kii-footer/kii-footer.component';
import { KiiToolbarComponent } from './components/kii-toolbar/kii-toolbar.component';
import { KiiPageComponent } from './components/kii-page/kii-page.component';
import { KiiLanguageSelectorComponent } from './components/kii-language-selector/kii-language-selector.component';
import { HomeComponent } from 'src/app/routes/home/home.component';
import { RouterModule, ExtraOptions } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { KiiLanguageService } from './services/kii-language.service';
import { KiiInjectorService } from './services/kii-injector.service';
import { KiiTranslatePipe } from './pipes/kii-translate.pipe';
import { DeviceDetectorService } from 'ngx-device-detector';
import { KiiViewTransferService } from './services/kii-view-transfer.service';
import { KiiBottomSheetCookiesComponent } from './components/kii-bottom-sheet-cookies/kii-bottom-sheet-cookies.component';
import { ModuleWithProviders } from '@angular/core';
import { KiiAppComponent } from './components/kii-app/kii-app.component';
import { KiiCookiesService } from './services/kii-cookies.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    [ MatDividerModule, 
      MatBottomSheetModule,
      MatButtonModule,
      MatCardModule,
      MatCheckboxModule,
      MatDialogModule,
      MatListModule,
      MatMenuModule,
      MatRippleModule,
      MatSnackBarModule,
      MatToolbarModule,
      MatTooltipModule,
    ],
  ],
  declarations: [
    KiiAppComponent,
    KiiTranslatePipe,
    KiiHeaderComponent,
    HeaderComponent,
    KiiFooterComponent,
    FooterComponent,
    KiiToolbarComponent,
    ToolbarComponent,
    KiiPageComponent,
    HomeComponent,
    KiiLanguageSelectorComponent,
    KiiBottomSheetCookiesComponent,
    KiiAppComponent
  ],
  //providers:[DeviceDetectorService,KiiInjectorService,KiiLanguageService, KiiViewTransferService],
  entryComponents:[KiiBottomSheetCookiesComponent],
  exports:[
    KiiAppComponent,
    KiiPageComponent,
    KiiToolbarComponent,
    KiiTranslatePipe
  ]
})
export class KiiCommonModule { 
/*  constructor(injector:Injector) {
    KiiInjectorService.setInjector(injector); //Store the injector so that we can access it later
  }*/

  //Providers available in the whole design including laze-loaded routes
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: KiiCommonModule,
      providers: [DeviceDetectorService, KiiLanguageService, KiiViewTransferService, KiiCookiesService ],
    }
  }

  //Providers available only on child routes, services will have their own instance !
  static forChild(): ModuleWithProviders {
    return {
      ngModule: KiiCommonModule,
      providers: []
    }
  }
}
