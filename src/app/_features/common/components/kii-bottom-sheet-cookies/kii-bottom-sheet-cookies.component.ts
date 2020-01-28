import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { KiiLanguageService } from '../../services/kii-language.service';

@Component({
  selector: 'app-kii-bottom-sheet-cookies',
  templateUrl: './kii-bottom-sheet-cookies.component.html',
  styleUrls: ['./kii-bottom-sheet-cookies.component.scss']
})
export class KiiBottomSheetCookiesComponent implements OnInit {

  constructor(private kiiLang: KiiLanguageService, private ref: MatBottomSheetRef<KiiBottomSheetCookiesComponent>) { 
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    //this.kiiLang.setRequiredContext(['main']);

  }


  reject() {
    this.ref.dismiss(false);
  }

  accept() {
    this.ref.dismiss(true);
  }
}
