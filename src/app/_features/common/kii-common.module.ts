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
} from '@angular/material';
import { KiiHeaderComponent } from './components/kii-header/kii-header.component';
import { KiiFooterComponent } from './components/kii-footer/kii-footer.component';
import { KiiToolbarComponent } from './components/kii-toolbar/kii-toolbar.component';
import { KiiPageComponent } from './components/kii-page/kii-page.component';
import { KiiLanguageSelectorComponent } from './components/kii-language-selector/kii-language-selector.component';
import { HomeComponent } from 'src/app/routes/home/home.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { KiiLanguageService } from './services/kii-language.service';
import { KiiStateTransferService } from './services/kii-state-transfer.service';
import { KiiInjectorService } from './services/kii-injector.service';
import { KiiTranslatePipe } from './pipes/kii-translate.pipe';
import { DeviceDetectorService } from 'ngx-device-detector';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    [  
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
    KiiTranslatePipe,
    HomeComponent,
    KiiHeaderComponent,
    HeaderComponent,
    KiiFooterComponent,
    FooterComponent,
    KiiToolbarComponent,
    ToolbarComponent,
    KiiPageComponent,
    KiiLanguageSelectorComponent,
  ],
  providers:[DeviceDetectorService,KiiStateTransferService,KiiInjectorService],
  exports:[
    HomeComponent,
    KiiPageComponent,
    KiiToolbarComponent,
    KiiTranslatePipe
  ]
})
export class KiiCommonModule { 
  constructor(injector:Injector,private kiiLang : KiiLanguageService) {
    KiiInjectorService.setInjector(injector); //Store the injector so that we can access it later

  }
}
