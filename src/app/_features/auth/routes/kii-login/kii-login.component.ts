import { Component, OnInit } from '@angular/core';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';

@Component({
  selector: 'app-kii-login',
  templateUrl: './kii-login.component.html',
  styleUrls: ['./kii-login.component.scss']
})
export class KiiLoginComponent implements OnInit {

  constructor(private kiiLang:KiiLanguageService) {
    this.kiiLang.setRequiredContext(['main','auth']);

   }

  ngOnInit() {
  }

}
