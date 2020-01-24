import { Optional, Inject } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

export interface IKiiLanguage  {
    name:string;
    iso:string;
    code:string;
}

export abstract class KiiLanguageServiceAbstract  {
  /**Observable that returns current language changes */  
  public onChange : Observable<string>;

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
    private _translate:TranslateService, 
    ) { 
        this.onChange = this._translate.onLangChange.pipe(map(res => res.lang));
    }


  /**Sets current language in the observer and stores it in the localStorage */
  public set(lang:string) {
    this._translate.use(lang);
  }

  /**Returns the supported languages as defined in the environment variables*/
  getSupportedLanguages() {
    let supported = [];
    for (let iso of environment.languages) {
      supported.push(this.KiiLanguages.find(obj => obj.iso == iso))
    }
    return supported;
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
}