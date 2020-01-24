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



  /**Gets language from url or from headers*/
  public get() {
    //Gets from url if exists in url
    const found = this.request.url.match(/\/[a-z][a-z]\//g);
    if (found) {
      if (found[0]) {
        return found[0].replace(/\//gi, '');
      }
    }
    //In case of oauth2 is better to use the referrer to get the language
    if (this.request.headers['referer']) {
      const foundReferrer = this.request.headers['referer'].match(/\/[a-z][a-z]\//g);
      if (foundReferrer) {
        if (foundReferrer[0]) {
          return foundReferrer[0].replace(/\//gi, '');
        }
      }
    }
    //Returns from headers
    let headerLang = environment.languages[0];
    try {
       headerLang = this.request.headers['accept-language'].substring(0, 2);
    if (environment.languages.indexOf(headerLang)<0) headerLang = environment.languages[0];
    } catch(error) {
       headerLang = environment.languages[0];
    }
    return headerLang;
  }

}
