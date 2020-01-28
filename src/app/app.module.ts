import { BrowserModule, TransferState, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { KiiCommonModule } from './_features/common/kii-common.module';
import { KiiLanguageService } from './_features/common/services/kii-language.service';
import { KiiInjectorService } from './_features/common/services/kii-injector.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    KiiCommonModule.forRoot(), //Common module containing all the shared main elements and home page
    RouterModule.forChild(routes),
    //NGX-TRANSLATE PART
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

