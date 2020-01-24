import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { environment } from '../../../../environments/environment';
import { KiiLanguageServiceAbstract } from './kii-language.service.abstract';


@Injectable({
  providedIn: 'root'
})
export class KiiLanguageService extends KiiLanguageServiceAbstract {
  constructor(
    @Optional() @Inject(REQUEST) private request: Request,
    private translate:TranslateService 
    ) { super(request,translate);}

  /**Gets current language. On the browser we use current language, on the server we get it from url or headers.*/
  public get() {
      if (localStorage.getItem("LOCALIZE_DEFAULT_LANGUAGE")) return localStorage.getItem("LOCALIZE_DEFAULT_LANGUAGE");
      let lang = this.translate.currentLang;
      if (!lang) lang = environment.languages[0];
      return lang; 
  }


}
