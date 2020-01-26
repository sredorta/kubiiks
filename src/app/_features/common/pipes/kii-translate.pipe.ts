import { Pipe, PipeTransform, ChangeDetectorRef, WrappedValue } from '@angular/core';
import { KiiLanguageService } from '../services/kii-language.service';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { Subject } from 'rxjs';

@Pipe({
  name: 'translate',
})
export class KiiTranslatePipe implements PipeTransform {

  private _latestValue:string = "";
  private _latestReturnedValue: string = "";

  constructor(private trans :KiiLanguageService, private _ref: ChangeDetectorRef) {
  }
  transform(value: any, ...args: any[]): any {
    this.trans.onLoaded.subscribe(res => {
      console.log("VALUE IS:",value)
      if (value === this._latestReturnedValue) {
        return this._latestReturnedValue;
      } else {
        if (this.trans.translations[this.trans.getCurrent()]) 
        if (this.trans.translations[this.trans.getCurrent()].hasOwnProperty(value)) {
          this._latestValue = this.trans.translations[this.trans.getCurrent()][value];
        } else
          this._latestValue = '**' + value + '**';
        console.log("RETURNING", this._latestValue)
        this._ref.markForCheck();
        this._latestReturnedValue = this._latestValue;
        return WrappedValue.wrap(this._latestValue);

        //this._ref.checkNoChanges();

        /*console.log("onLoaded happened !!!",this.trans.translations[this.trans.getCurrent()]);
        if (this.trans.translations[this.trans.getCurrent()]) 
        if (this.trans.translations[this.trans.getCurrent()].hasOwnProperty(value)) {
          this._value = this.trans.translations[this.trans.getCurrent()][value];
        } else
          this._value = '**' + value + '**';
        //this._ref.reattach();
        this._ref.markForCheck();
        console.log("Returning value:",this._value);*/
      }
    })
    return WrappedValue.wrap(value);
    
    //this._latestReturnedValue = this._latestValue;
    //return WrappedValue.wrap(this._latestValue);

    //this._originalValue = value;
    //this._value = value;
    //return WrappedValue.wrap(this._value);

  }
  ngOnDestroy(): void {

  }

}
