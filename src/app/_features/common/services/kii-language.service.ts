
import { Optional, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Observable,of, forkJoin, BehaviorSubject, Subject } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { StateKey, makeStateKey, TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { KiiInjectorService } from './kii-injector.service';
import { KiiTranslatePipe } from '../pipes/kii-translate.pipe';
import { KiiCommonModule } from '../kii-common.module';
declare var require: any;
const fs = require('fs');

export interface IKiiLanguage  {
    name:string;
    iso:string;
    code:string;
}
@Injectable({
  providedIn: 'root'
})
export  class KiiLanguageService  {
  /**Observable that returns current language changes */  
  public onChange : Observable<string>;

  /**Observable that changes when loading process is completed */
  public onLoaded = new Subject<boolean>();

  private _onLoaded : boolean = false;
  
  /**Current language in utilization, set by default already */
  private currentLang : string = environment.languages[0];

  /**Context of the translations */
  public context:string = "main";

  /**Contains the current loaded contexts */
  private contextLoaded:string[] = [];

  /**Contains the current translations table per language */
  public translations:any = {};

  /**All languages that can potentially be used, use the environment to select a subset */
  public KiiLanguages : IKiiLanguage[] = [
    {name: "Francais",
     iso : "fr",
     code : "FR" },
    {name: "English",
     iso : "en",
     code: "GB"
    },  
    {name: "Español",
     iso : "es",
     code: "ES"
    },
    {name: "Català",
     iso : "ca",
     code: "CA"
    }];

  constructor(
    @Optional() @Inject(REQUEST) private _request: Request,
    @Inject(PLATFORM_ID) private platform: any,
    private transfer : TransferState,
    private http: HttpClient,
    ) { 
        this.onChange = of('fr');
    }

  /**Selects current language */
  public use(lang:string) {
    console.log("NEW: Using language:",this.sanitize('en'));
    this.currentLang = this.sanitize(lang);
  }



  //TO BE REMOVED
  public set(lang:string) {
    //this._translate.use(lang);
  }

  /**Returns current language loaded */
  getCurrent() {
    return this.currentLang;
  }

  /**Returns the supported languages as defined in the environment variables*/
  getSupportedLanguages() {
    let supported = [];
    for (let iso of environment.languages) {
      supported.push(this.KiiLanguages.find(obj => obj.iso == iso))
    }
    return supported;
  }

  /**Sanitize the language, if is wrong we return the default */
  private sanitize(lang:string) {
    const lf = this.getSupportedLanguages().find(obj => obj.iso == lang);
    return lf?lf.iso:environment.languages[0];
  }

  /**Gets the language code from an iso */
  getCode(iso:string) {
    let lang = this.getSupportedLanguages().find(obj => obj.iso == iso);
    return lang.code;
  }

  /**Returns the language set as default in the app */
  getDefault() {
      return environment.languages[0];
  }

  /**Sets current translations context */
  setContext(context:string) {
    this.context=context;
  }

  /**Gets current context */
  private getContext() {
      return this.context;
  }
  private static getContextName(contextName:string,lang:string) {
    return contextName + '-'+lang;
  }

  /**Creates context item */
  private createContext(contextName:string) {
    if (!this.isContextAvailable(KiiLanguageService.getContextName(contextName,this.currentLang))) this.contextLoaded.push(KiiLanguageService.getContextName(contextName,this.currentLang));
  }

  /**Checks if the context is already been loaded */
  private isContextAvailable(context:string) {
      return this.contextLoaded.indexOf(context)>-1?true:false;
  }

  /**Loads the contexts that are required for the module */
  loadTranslation(context:string[]) : Observable<any> {
      console.log("loadTranslation",context);
      let wait :Observable<any>[] = [];
      for (let ctx of context) {
        //If context already available do nothing
        if (this.isContextAvailable(KiiLanguageService.getContextName(ctx, this.currentLang))) {
          console.log("Context already available")
          return of({});
        }
        //Load context
        console.log("Loading context data", KiiLanguageService.getContextName(ctx, this.currentLang) )
        if (isPlatformBrowser(this.platform))  
          wait.push(this.loadContextFromHttp(ctx));
        else
          wait.push(this.loadContextFromFile(ctx));
      }
      forkJoin(wait).subscribe(results => {
        for (let res of results) {
            if (!this.translations[this.currentLang]) this.translations[this.currentLang] = res;
            else this.translations[this.currentLang] = Object.assign({},this.translations[this.currentLang],res);
        }
        //Notify pipes that we have completed loading
        this.onLoaded.next(!this._onLoaded);

      })
  }

  /**Loads the context from the TransferState if exists */
  private loadContextFromTrasferState(contextName:string):Observable<any> {
    const key: StateKey<number> = makeStateKey<number>('transfer-' + KiiLanguageService.getContextName(contextName,this.currentLang));
    const data = this.transfer.get(key, null);
    if (data) console.log("LOADED FROM STATETABLE !!!!",data);
    return data;
  }


  /**Loads context from a file and saves it in the state transfer */
  private loadContextFromFile(contextName:string) :Observable<any> {
    const key: StateKey<number> = makeStateKey<number>('transfer-' + KiiLanguageService.getContextName(contextName,this.currentLang));
    const data = JSON.parse(fs.readFileSync(`./dist/browser/assets/i18n/${contextName}/${this.currentLang}.json`, 'utf8'));
    this.transfer.set(key, data);
    if (data)
      return Observable.create(observer => {
        observer.next(data);
        observer.complete();
      });
    else return of({});  
  }

  private loadContextFromHttp(contextName:string) : Observable<any> {
    const data = this.loadContextFromTrasferState(contextName);
    if (data)
      return Observable.create(observer => {
        observer.next(data);
        observer.complete();
      });
    else {  
      const path = "/assets/i18n/"+contextName + "/" + this.currentLang+ ".json";
      return this.http.get(path).pipe(catchError(res => {
        return of({});
      }));
    }
  }

  /**Checks if translation is in transfer table if not, get from http */
  public getTranslation(lang: string) {
    console.log("Translations",this.translations);
    if (this.translations[lang]) return this.translations[lang];
    return {};
  }








  public get() {
    if (isPlatformBrowser(this.platform)) {
        if (localStorage.getItem("LOCALIZE_DEFAULT_LANGUAGE")) return localStorage.getItem("LOCALIZE_DEFAULT_LANGUAGE");
        let lang = environment.languages[0];//this._translate.currentLang;
        if (!lang) lang = environment.languages[0];
        return lang; 
    } else {
        //Gets from url if exists in url
        const found = this._request.url.match(/\/[a-z][a-z]\//g);
        if (found) {
          if (found[0]) {
            return found[0].replace(/\//gi, '');
          }
        }
        //In case of oauth2 is better to use the referrer to get the language
        if (this._request.headers['referer']) {
          const foundReferrer = this._request.headers['referer'].match(/\/[a-z][a-z]\//g);
          if (foundReferrer) {
            if (foundReferrer[0]) {
              return foundReferrer[0].replace(/\//gi, '');
            }
          }
        }
        //Returns from headers
        let headerLang = environment.languages[0];
        try {
          headerLang = this._request.headers['accept-language'].substring(0, 2);
        if (environment.languages.indexOf(headerLang)<0) headerLang = environment.languages[0];
        } catch(error) {
          headerLang = environment.languages[0];
        }
        return headerLang;
    }
  }
}