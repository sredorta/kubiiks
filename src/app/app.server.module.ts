import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
declare var require: any;
const fs = require('fs');
import { KiiStateTransferService } from './services/kii-state-transfer.service';
import { TransferState } from '@angular/platform-browser';
import { KiiTranslateServerLoader } from './_features/common/utils/kii-translate-server-loader';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KiiCommonModule } from './_features/common/kii-common.module';



@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    KiiCommonModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: KiiTranslateServerLoader.getFactory(),
          deps: [TransferState]
      }
}),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

/*
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
  constructor(transfer : KiiStateTransferService) {
      transfer.scroll(); //Handle scroll when transfer server/browser
  }
 }*/