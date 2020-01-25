import { HttpClient } from '@angular/common/http';
import { TransferState, StateKey, makeStateKey } from '@angular/platform-browser';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import {Observable, of, Observer} from "rxjs";
import {catchError} from "rxjs/operators";
import { Inject, PLATFORM_ID, Injector, InjectionToken } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
import { Platform } from '@angular/cdk/platform';
import { KiiInjectorService } from '../services/kii-injector.service';
import { KiiStateTransferService } from 'src/app/services/kii-state-transfer.service';
import { inject } from '@angular/core/testing';
declare var require: any;
const fs = require('fs');

/**Loads translation from transfer state or from http call */
export class KiiTranslateLazyLoader implements TranslateLoader {
    context : string;
    platform : any;
    constructor(
      private http: HttpClient,
      private transferState : TransferState,
      context : string | null
    ) {
        /*const injector = KiiInjectorService.getInjector();
        console.log("Restored injector", injector);

        this.platform = injector.get(PLATFORM_ID);


        if (context === undefined) this.context = "main";
        else this.context = context;
        const service = injector.get(TranslateService);
        const loader = injector.get(TranslateLoader);
        loader.context = context;
        service.getTranslation(service.currentLang).subscribe(res => {
          service.setTranslation(service.currentLang,res);
        });
        //service.reloadLang(service.currentLang);*/
    }

    getTranslation(lang:string) : Observable<any>{
      console.log("we are here !!!");
      return of({});
    }
    
    /**Returns the factory */
    public static getFactory(context?:string)  {
        return function KiiTranslateBrowserFactory(http: HttpClient,transfer: TransferState) {
            //return new KiiTranslateLazyLoader(http,transfer,context);
            const injector = KiiInjectorService.getInjector();
        console.log("Restored injector", injector);

        if (context === undefined) context = "main";
        else context = context;
        const service = injector.get(TranslateService);
        const loader = injector.get(TranslateLoader);
        loader.context = context;
        service.getTranslation(service.currentLang).subscribe(res => {
          console.log("Updating translations to:",res);
          service.setTranslation(service.currentLang,res);
        });
    }
}
  }
