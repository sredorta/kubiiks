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
import { KiiTranslateServerLoader } from './features/common/utils/kii-translate-server-loader';



@NgModule({
  imports: [
    AppModule,
    ServerModule,
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


