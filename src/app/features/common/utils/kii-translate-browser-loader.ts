import { HttpClient } from '@angular/common/http';
import { TransferState, StateKey, makeStateKey } from '@angular/platform-browser';
import { TranslateLoader } from '@ngx-translate/core';
import {Observable, of, Observer} from "rxjs";
import {catchError} from "rxjs/operators";

/**Loads translation from transfer state or from http call */
export class KiiTranslateBrowserLoader implements TranslateLoader {
    context : string;
    constructor(
      private http: HttpClient,
      private transferState : TransferState,
      context : string | null
    ) {
        if (context === undefined) this.context = "main";
        else this.context = context;
        console.log("Loading translations context:", this.context)
    }
    
  
    /**Checks if translation is in transfer table if not, get from http */
    public getTranslation(lang: string): Observable<any> {
      const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
      const data = this.transferState.get(key, null);
      // First we are looking for the translations in transfer-state, if none found, http load as fallback
      if (data) {
          return Observable.create(observer => {
            observer.next(data);
            observer.complete();
          });
      } else {
          const path = "/assets/i18n/" + lang + ".json";
          return this.http.get(path).pipe(catchError(res => {
              console.error("Could not find translation file:", path);
              return of({});
          }));
      }
    }
    
    /**Returns the factory */
    public static getFactory(context?:string) {
        return function KiiTranslateBrowserFactory(http: HttpClient,transfer: TransferState) {
            return new KiiTranslateBrowserLoader(http,transfer,context);
        }
    }
  }