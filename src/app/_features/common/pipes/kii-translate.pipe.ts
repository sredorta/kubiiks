import { Pipe, PipeTransform } from '@angular/core';
import { KiiLanguageService } from '../services/kii-language.service';
import { BehaviorSubject } from 'rxjs';

@Pipe({
  name: 'translate',
})
export class KiiTranslatePipe implements PipeTransform {
  previousValue : string;
  subscription = [];
  constructor(private trans :KiiLanguageService) {}
  transform(value: any, ...args: any[]): any {
      const _subject = new BehaviorSubject(value);
      this.subscription.push(this.trans.onLoaded.subscribe(res => {
        if (this.trans.translations[this.trans.getCurrent()]) 
        if (this.trans.translations[this.trans.getCurrent()].hasOwnProperty(value)) {
          _subject.next(this.getFromTranslation(value,args));
        }
      }))
      return _subject;
  }

  getFromTranslation(key:string,args:any[]) {
    if (!args.length) {
      return this.trans.translations[this.trans.getCurrent()][key];
    }
    //Do replacement, we only accept one parameter with object
    if (args.length!=1) {
      console.error("Wrong format only one parameter accepted as an object:  key | translate | async:param, where param is a mutated object !!!"); 
      return this.trans.translations[this.trans.getCurrent()][key];
    }
    if (args[0]===undefined) {
      return this.trans.translations[this.trans.getCurrent()][key];
    }
    let str :string = this.trans.translations[this.trans.getCurrent()][key];
    for (let [key, value] of Object.entries(args[0])) {
      let regex = new RegExp("\{\{"+key +"\}\}");
      str = str.replace(regex,String(value));
    }
    return str;
  }

  ngOnDestroy() {
    console.log("DESTROYING !!!!");
    for (let subscription of this.subscription) {
      console.log("unsubscribing !!!");
      subscription.unsubscribe();
    }
  }
}
