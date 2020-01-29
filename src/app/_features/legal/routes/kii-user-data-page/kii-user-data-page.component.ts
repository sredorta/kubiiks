import { Component, OnInit } from '@angular/core';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-kii-user-data-page',
  templateUrl: './kii-user-data-page.component.html',
  styleUrls: ['./kii-user-data-page.component.scss']
})
export class KiiUserDataPageComponent implements OnInit {

  constructor(private kiiLang: KiiLanguageService, private location : Location) { }

  ngOnInit() {
    this.kiiLang.setRequiredContext(['main','legal']);
  }

  goBack() {
    this.location.back();
  }
}
