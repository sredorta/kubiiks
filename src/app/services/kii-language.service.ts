import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

export const KiiLanguages = [
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

@Injectable({
  providedIn: 'root'
})
export class KiiLanguageService {

  constructor(
      @Inject(PLATFORM_ID) private _platformId: Object, 
      @Optional() @Inject(REQUEST) private _request: Request,
      private _translate:TranslateService, 
      ) { }


  /**Get current language observable*/
  public onChange() {
    return this._translate.onLangChange.pipe(map(res => res.lang));
  }


  /**Sets current language in the observer and stores it in the localStorage */
  public set(lang:string) {
    //Detect if the node contains parameters
    this._translate.use(lang);
  }



  /**Gets current language. On the browser we use current language, on the server we get it from url or headers.*/
  public get() {
    if (isPlatformBrowser(this._platformId)) {
      if (localStorage.getItem("LOCALIZE_DEFAULT_LANGUAGE")) return localStorage.getItem("LOCALIZE_DEFAULT_LANGUAGE");
      let lang = this._translate.currentLang;
      if (!lang) lang = environment.languages[0];
      return lang ; //localStorage.getItem("LOCALIZE_DEFAULT_LANGUAGE");
    } else {
      return this.getFromUrlOrHeaders();
    }
  }


  /**Gets language from url or from headers*/
  getFromUrlOrHeaders() {
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


  /**Returns the supported languages as defined in the environment variables*/
  getSupportedLanguages() {
    let supported = [];
    for (let iso of environment.languages) {
      supported.push(KiiLanguages.find(obj => obj.iso == iso))
    }
    return supported;
  }
}
