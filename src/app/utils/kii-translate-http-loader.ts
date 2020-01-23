import {HttpClient} from '@angular/common/http';
import {TranslateLoader} from '@ngx-translate/core';
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import { KiiStateTransferService } from '../services/kii-state-transfer.service';


export class KiiTranslateHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private transfer: KiiStateTransferService,
  ) {}
  

  public getTranslation(lang: string): Observable<any> {
    let data = this.transfer.restoreTranslations(lang);
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
}