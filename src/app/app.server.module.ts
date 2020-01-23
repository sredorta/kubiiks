import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TransferState, StateKey, makeStateKey } from '@angular/platform-browser';
import { Observable, Observer } from 'rxjs';
declare var require: any;
const fs = require('fs');
import { KiiStateTransferService } from './services/kii-state-transfer.service';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, 
        useFactory: translateFactory,
        deps: [KiiStateTransferService]
      }
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

export class TranslateServerLoader implements TranslateLoader {
  constructor(private transfer : KiiStateTransferService) {}
  public getTranslation(lang: string) : Observable<any> {
   return Observable.create((observer: Observer<any>) => {
     const jsonData = JSON.parse(fs.readFileSync(`./dist/browser/assets/i18n/${lang}.json`, 'utf8'));
     // Here we save the translations in the transfer-state to avoid glitch
     this.transfer.saveTranslations(lang,jsonData);
     observer.next(jsonData);
     observer.complete();
   });
 }
}

export function translateFactory(transfer: KiiStateTransferService) {
 return new TranslateServerLoader(transfer);
}
