
import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { KiiLanguageService } from '../services/kii-language.service';

@Pipe({
  name: 'translate',
  pure:false
})
export class KiiTranslatePipe implements PipeTransform {


  constructor(private trans :KiiLanguageService, private _ref: ChangeDetectorRef) {
  }
  transform(value: any, ...args: any[]): any {
      if (this.trans.translations[this.trans.getCurrent()]) 
      if (this.trans.translations[this.trans.getCurrent()].hasOwnProperty(value)) {
        return this.trans.translations[this.trans.getCurrent()][value];
      } else
        return '**' + value + '**';
  }

  ngOnDestroy(): void {
  }

}
