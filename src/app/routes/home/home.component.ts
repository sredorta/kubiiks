import { Component, OnInit } from '@angular/core';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private kiiLang: KiiLanguageService) { }

  ngOnInit() {
    console.log("ON INIT HOME !");
    this.kiiLang.setRequiredContext(['main']);
  }

  /*switch() {
    if (this.trans.getCurrent() == 'fr') this.trans.use('en');
    else this.trans.use('fr');
  }*/
}
