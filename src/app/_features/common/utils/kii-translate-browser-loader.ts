import { HttpClient } from '@angular/common/http';
import { TransferState, StateKey, makeStateKey } from '@angular/platform-browser';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import {Observable, of, Observer} from "rxjs";
import {catchError,map} from "rxjs/operators";
import { KiiInjectorService } from '../services/kii-injector.service';

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
      //WA: Issues with for root... This is a workaround !
      const injector = KiiInjectorService.getInjector();
      const service = injector.get(TranslateService);
      if (lang === undefined) {

        console.log(service);
        lang= service.currentLang;
        service.getTranslation(lang).subscribe(res => {
          console.log("WE GOT HERE NOW",res);
          service.setTranslation(service.currentLang,null);
          service.setTranslation(service.currentLang,res);

          service.reloadLang(service.currentLang);
          service.use(service.currentLang);
        });
      } else {
      console.log("InGetTRANSLATION !!!!!!!!!!!!!!!!!!!!!!!", this.context,lang);
      console.log(service)
      /*const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
      const data = this.transferState.get(key, null);
      // First we are looking for the translations in transfer-state, if none found, http load as fallback
      if (data) {
          return Observable.create(observer => {
            observer.next(data);
            observer.complete();
          });
      } else {*/
          const path = "/assets/i18n/"+this.context+"/" + lang + ".json";
          console.log("Requestion following file:", path);
          return this.http.get(path);//console.log(res) ));
      //}
      }
    }
    
    /**Returns the factory */
    public static getFactory(context?:string) {
        return function KiiTranslateBrowserFactory(http: HttpClient,transfer: TransferState) {
            return new KiiTranslateBrowserLoader(http,transfer,context);
        }
    }
  }