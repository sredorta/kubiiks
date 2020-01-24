import { BrowserModule, TransferState, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KiiStateTransferService } from './services/kii-state-transfer.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { KiiTranslateBrowserLoader } from './features/common/utils/kii-translate-browser-loader';
import { RouterModule } from '@angular/router';
import { KiiCommonBrowserModule } from './features/common/kii-common.browser.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    KiiCommonBrowserModule, //Common module containing all the shared main elements and home page
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
  constructor(transfer : KiiStateTransferService) {
      transfer.scroll(); //Handle scroll when transfer server/browser
  }
 }

