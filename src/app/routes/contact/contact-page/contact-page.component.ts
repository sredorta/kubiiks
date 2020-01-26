import { Component, OnInit } from '@angular/core';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';
import { KiiFeatureAbstract } from 'src/app/abstracts/kii-feature.abstract';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent extends KiiFeatureAbstract implements OnInit {

  constructor() {super(['main']); }

  ngOnInit() {
    this.init();
  }

}
