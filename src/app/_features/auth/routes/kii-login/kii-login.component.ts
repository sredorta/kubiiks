import { Component, OnInit } from '@angular/core';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';
import { KiiFeatureAbstract } from 'src/app/abstracts/kii-feature.abstract';

@Component({
  selector: 'app-kii-login',
  templateUrl: './kii-login.component.html',
  styleUrls: ['./kii-login.component.scss']
})
export class KiiLoginComponent extends KiiFeatureAbstract implements OnInit {

  constructor() {
    super(['main','auth']);
   }

  ngOnInit() {
    this.init();
  }

}
