import { HttpClient } from '@angular/common/http';
import { TransferState, StateKey, makeStateKey } from '@angular/platform-browser';
import { TranslateLoader } from '@ngx-translate/core';
import {Observable, of, Observer} from "rxjs";
import {catchError} from "rxjs/operators";
declare var require: any;
const fs = require('fs');


/**Loads translation from file */
export class KiiTranslateServerLoader implements TranslateLoader {
    context:string;
    constructor(private transfer : TransferState,context?:string) {
        if (context === undefined) this.context = "main";
        else this.context = context;
        console.log("Loading translations context:", this.context);
    }
    public getTranslation(lang: string) : Observable<any> {
     return Observable.create((observer: Observer<any>) => {
       const jsonData = JSON.parse(fs.readFileSync(`./dist/browser/assets/i18n/${this.context}/${lang}.json`, 'utf8'));
       // Here we save the translations in the transfer-state to avoid glitch
       const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
       this.transfer.set(key, jsonData);
       observer.next(jsonData);
       observer.complete();
     });
   }

    /**Returns the Factory for Server */
    public static getFactory(context?:string) {
        return function KiiTranslateServerFactory(transfer: TransferState) {
            return new KiiTranslateServerLoader(transfer,context);
        }
    }
  }