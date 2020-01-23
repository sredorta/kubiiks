import { Component, OnInit } from '@angular/core';
import { KiiLanguageService } from '../../../services/kii-language.service';
import { TranslateService } from '@ngx-translate/core';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent extends KiiBaseAbstract implements OnInit {

  currentLanguage : string;

  constructor(private trans:TranslateService, private _kiiApiLanguage : KiiLanguageService ) {
    super();
  }

  ngOnInit() {
    this.currentLanguage = this.getCode(this._kiiApiLanguage.get());
    this.addSubscriber(
      this._kiiApiLanguage.onChange().subscribe(lang => {
        this.currentLanguage = this.getCode(lang);
      })
    );
  }

  /**Gets the language code from an iso */
  getCode(iso:string) {
    let lang = this._kiiApiLanguage.getSupportedLanguages().find(obj => obj.iso == iso);
    return lang.code;
  }

  /** Returns the supported languages as defined in the environment variables*/
  getSupportedLanguages() {
    return this._kiiApiLanguage.getSupportedLanguages();
  }

  //Sets a language to the element
  //Maps country to language
  //  ES -> Spanish
  //  FR -> French
  //  GB -> English
  //  CA -> Catalan
  /**Gets correct flag for each available language */
  getFlagPosition(code : any) {
    function calcPos(letter:any, size : any) {
      return -(letter.toLowerCase().charCodeAt(0) - 97) * size;
    }
    var size = {
          w: 20,
          h: 15
    };
    var x = calcPos(code[1], size.w),
      y = calcPos(code[0], size.h);
    
    return [x, 'px ', y, 'px'].join('');
  }

  /**Selects language when user clicks on a flag */
  selectLanguage(iso:string) {
    this._kiiApiLanguage.set(iso);
    this.currentLanguage = this.getCode(iso); 
  }

}
