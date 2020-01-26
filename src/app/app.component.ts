import { Component } from '@angular/core';
import { KiiLanguageService } from './_features/common/services/kii-language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'kubiiks';
  constructor(private kiiLang : KiiLanguageService) {}

  ngOnInit() {
    console.log("Setting lang to fr");


    this.kiiLang.use('toto');
    this.kiiLang.setContext('main');
    this.kiiLang.use('fr');
    this.kiiLang.loadTranslation(['main','auth']);



  }
}
