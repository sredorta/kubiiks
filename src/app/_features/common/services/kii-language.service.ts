
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
  public onChange = new BehaviorSubject<string>(environment.languages[0]);

  /**Observable that changes when loading process is completed */
  public onLoaded = new Subject<boolean>();

  private _onLoaded : boolean = false;
  
  /**Current language in utilization, set by default already */
  private currentLang : string = environment.languages[0];


  /**Contains the current loaded contexts */
  public contextLoaded:any = {};

  /**Contains the language context required so that when we change language we load any missing context */
  public requiredContext:string[] = ['main'];

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
        
    }

  /**Selects current language */
  public changeLanguage(lang:string) {
    this.currentLang = this.sanitize(lang);
    console.log("LANGUAGE SET:", this.currentLang);
    this.loadTranslation(this.requiredContext,true);

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


  /**Creates context item */
  private createContext(contextName:string) {
    if (!this.contextLoaded[this.currentLang])
        this.contextLoaded[this.currentLang] = [];
    if (!this.isContextAvailable(contextName))
        this.contextLoaded[this.currentLang].push(contextName);     
  }

  /**Checks if the context is already been loaded */
  private isContextAvailable(context:string) {
    if (!this.contextLoaded[this.currentLang])
      return false;
    else
      return this.contextLoaded[this.currentLang].indexOf(context)>-1?true:false;  
  }

  /**Sets the required context for the module */
  public setRequiredContext(context:string[]) {
    this.requiredContext = context;
    console.log("REQUIRED: ",this.requiredContext);
    this.loadTranslation(context);
  }

  /**Loads the contexts that are required for the module */
  private loadTranslation(context:string[], isLanguageChange:boolean = false)  {
        //Loads any missing context
        let wait :Observable<any>[] = [];
        console.log("loadTranslation !!!!!!!!!!! start")
        for (let ctx of context) {
          //If context already available do nothing
          if (this.isContextAvailable(ctx)) {
            console.log("Context already available")
          } else {
            //Load context
            console.log("Loading context data: ", ctx) 
            if (isPlatformBrowser(this.platform))  
              wait.push(this.loadContextFromHttp(ctx));
            else
              wait.push(this.loadContextFromFile(ctx));
          }
        }
        for (let ctx of context) { this.createContext(ctx); }
        console.log("!!!!!!!!!!!!!!!!!!!!!!loadTranslation end");
        forkJoin(wait).subscribe(results => {
            for (let res of results) {
                if (!this.translations[this.currentLang]) this.translations[this.currentLang] = res;
                else this.translations[this.currentLang] = Object.assign({},this.translations[this.currentLang],res);
            }
            //Notify pipes that we have completed loading
            console.log("LOADED TRANS",this.translations);
            this.onLoaded.next(!this._onLoaded);
            if (isLanguageChange) {
              console.log("LANGUAGE CHANGE SENDING");
              this.onChange.next(this.currentLang);
            }
        })
  }

  /**Loads the context from the TransferState if exists */
  private loadContextFromTrasferState(contextName:string):Observable<any> {
    const key: StateKey<number> = makeStateKey<number>('transfer-' + contextName + this.currentLang);
    const data = this.transfer.get(key, null);
    if (data) console.log("LOADED FROM STATETABLE !!!!",data);
    return data;
  }


  /**Loads context from a file and saves it in the state transfer */
  private loadContextFromFile(contextName:string) :Observable<any> {
    const key: StateKey<number> = makeStateKey<number>('transfer-' +contextName + this.currentLang);
    const data = JSON.parse(fs.readFileSync(`./dist/browser/assets/i18n/${this.currentLang}/${contextName}.json`, 'utf8'));
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
      const path = "/assets/i18n/"+this.currentLang + "/" + contextName + ".json";
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