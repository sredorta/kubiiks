import { Component, OnInit } from '@angular/core';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';
import { KiiFeatureAbstract } from 'src/app/abstracts/kii-feature.abstract';

@Component({
  selector: 'app-kii-signup',
  templateUrl: './kii-signup.component.html',
  styleUrls: ['./kii-signup.component.scss']
})
export class KiiSignupComponent extends KiiFeatureAbstract implements OnInit {

  constructor() { super(['main','auth']) }

  ngOnInit() {
    this.init();
  }

}
