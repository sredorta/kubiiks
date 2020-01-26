import { Component, OnInit } from '@angular/core';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';
import { KiiFeatureAbstract } from 'src/app/abstracts/kii-feature.abstract';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends KiiFeatureAbstract  implements OnInit {

  constructor() { super(['main']); }

  ngOnInit() {
    this.init();
  }

  /*switch() {
    if (this.trans.getCurrent() == 'fr') this.trans.use('en');
    else this.trans.use('fr');
  }*/
}
