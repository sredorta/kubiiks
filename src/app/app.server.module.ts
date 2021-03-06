import { NgModule, Injector } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KiiCommonModule } from './_features/common/kii-common.module';
import { TransferState } from '@angular/platform-browser';
import { KiiInjectorService } from './_features/common/services/kii-injector.service';



@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    KiiCommonModule.forRoot(), //Common module containing all the shared main elements and home page
    ServerTransferStateModule,
    ModuleMapLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppServerModule {

}
