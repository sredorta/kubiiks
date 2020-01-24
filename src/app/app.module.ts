import { BrowserModule, TransferState, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KiiStateTransferService } from './services/kii-state-transfer.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { KiiTranslateBrowserLoader } from './_features/common/utils/kii-translate-browser-loader';
import { RouterModule } from '@angular/router';
import { KiiCommonModule } from './_features/common/kii-common.module';
import { KiiInjectorService } from './_features/common/services/kii-injector.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    KiiCommonModule, //Common module containing all the shared main elements and home page
    RouterModule.forChild(routes),
    //NGX-TRANSLATE PART
    HttpClientModule,
    TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: KiiTranslateBrowserLoader.getFactory(),
              deps: [HttpClient, TransferState]
          }
    }),
 
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [TranslateService,DeviceDetectorService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(transfer : KiiStateTransferService,injector:Injector) {
      transfer.scroll(); //Handle scroll when transfer server/browser
      console.log("Storing injector of app",injector);
      KiiInjectorService.setInjector(injector)
  }
 }

