import { Component, OnInit } from '@angular/core';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';

@Component({
  selector: 'app-kii-cookies-page',
  templateUrl: './kii-cookies-page.component.html',
  styleUrls: ['./kii-cookies-page.component.scss']
})
export class KiiCookiesPageComponent implements OnInit {

  constructor(private kiiLang: KiiLanguageService) { }

  ngOnInit() {
    this.kiiLang.setRequiredContext(['main','legal']);
  }

}
