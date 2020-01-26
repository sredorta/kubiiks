import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { KiiLanguageService } from '../services/kii-language.service';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

@Pipe({
  name: 'translate',
  pure:false
})
export class KiiTranslatePipe implements PipeTransform {
  previousValue : string;
  constructor(private trans :KiiLanguageService) {}
  transform(value: any, ...args: any[]): any {
      if (this.trans.translations[this.trans.getCurrent()]) 
      if (this.trans.translations[this.trans.getCurrent()].hasOwnProperty(value)) {
        return this.getFromTranslation(value,args);
      }
      return '**' + value + '**';
  }

  getFromTranslation(key:string,args:any[]) {
    if (!args.length) {
      //console.log("RETURNING:",this.trans.translations[this.trans.getCurrent()][key] )
      return this.trans.translations[this.trans.getCurrent()][key];
    }
    //Do replacement, we only accept one parameter with object
    if (args.length!=1) {
      console.error("Wrong format only one parameter accepted as an object:  key | translate:param "); 
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

}

/*
@Pipe({
  name: 'translate',
  pure:false
})
export class KiiTranslatePipe implements PipeTransform {
  previousValue : string;
  constructor(private trans :KiiLanguageService, private ref: ChangeDetectorRef) {}
  transform(value: any, ...args: any[]): any {
      if (this.trans.translations[this.trans.getCurrent()]) 
      if (this.trans.translations[this.trans.getCurrent()].hasOwnProperty(value)) {
        return this.trans.translations[this.trans.getCurrent()][value];
      }
      return '**' + value + '**';
  }

}*/