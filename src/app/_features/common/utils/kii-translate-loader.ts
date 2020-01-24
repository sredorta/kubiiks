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
declare var require: any;
const fs = require('fs');

/**Loads translation from transfer state or from http call */
export class KiiTranslateLoader implements TranslateLoader {
    context : string;
    platform : any;
    constructor(
      private http: HttpClient,
      private transferState : TransferState,
      context : string | null
    ) {
        const injector = KiiInjectorService.getInjector();
        console.log("Restored injector", injector);

        this.platform = injector.get(PLATFORM_ID);
        console.log("Restored injector", injector.get(PLATFORM_ID));
        let trans = injector.get(TranslateLoader);
        trans.context = "auth";
        console.log("TranslateService : ", trans);
        console.log("Loader context is :", trans.context);
        trans.getTranslation(trans.currentLang);

        if (context === undefined) this.context = "main";
        else this.context = context;
        console.log("Loading translations context:", this.context)
    }
    
  
    /**Checks if translation is in transfer table if not, get from http */
    public getTranslation(lang: string): Observable<any> {
        console.log("We are in GetTranslation !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      if (isPlatformBrowser(this.platform)) { 
        /*console.log("We are here, trying to get files from ", "/assets/i18n/"+this.context+"/" + lang + ".json"); 
        const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
        const data = this.transferState.get(key, null);
        // First we are looking for the translations in transfer-state, if none found, http load as fallback
        if (data) {
            return Observable.create(observer => {
                observer.next(data);
                observer.complete();
            });
        } else {*/
            const path = "/assets/i18n/"+this.context+"/" + lang + ".json";
            return this.http.get(path).pipe(catchError(res => {
                console.error("Could not find translation file:", path);
                return of({});
            }));
        //}
      } else {
        return Observable.create((observer: Observer<any>) => {
            const jsonData = JSON.parse(fs.readFileSync(`./dist/browser/assets/i18n/${this.context}/${lang}.json`, 'utf8'));
            // Here we save the translations in the transfer-state to avoid glitch
            const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
            this.transferState.set(key, jsonData);
            observer.next(jsonData);
            observer.complete();
          });
      } 
    }
    /**Returns the factory */
    public static getFactory(context?:string)  {
            return function KiiTranslateBrowserFactory(http: HttpClient,transfer: TransferState) {
                return new KiiTranslateLoader(http,transfer,context);
            }
    }
  }
