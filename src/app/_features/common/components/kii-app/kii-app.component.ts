import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { KiiLanguageService } from '../../services/kii-language.service';
import { Cookies } from '../../utils/cookies';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { MatBottomSheet } from '@angular/material';
import { KiiBottomSheetCookiesComponent } from '../kii-bottom-sheet-cookies/kii-bottom-sheet-cookies.component';
import { KiiViewTransferService } from '../../services/kii-view-transfer.service';

@Component({
  selector: 'kii-app',
  templateUrl: './kii-app.component.html',
  styleUrls: ['./kii-app.component.scss']
})
export class KiiAppComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platform: any,
              public kiiLang: KiiLanguageService,
              private viewTrans : KiiViewTransferService,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit() {

    console.log("ONINIT: KIIAPP");
    this.viewTrans.scroll();

    //Sets language required context
    this.kiiLang.setRequiredContext(['main']);
    if (isPlatformBrowser(this.platform)) {
      console.log("WE ARE NOW HERE !!!!");
      //let lang$ = this.kiiLang.onLoaded.subscribe(res => {
        console.log("LANG RESULTS ARE THERE !!!");
      //  lang$.unsubscribe();
        //CHECK FOR COOKIES
        setTimeout(() => {
        if (!Cookies.areAccepted()) {
          this.openBottomSheetCookies();
        }
      },5000);

      //});
    }
  }
  openBottomSheetCookies(): void {
    console.log("OPENING COOKIES BOTOMSHEEET !!!!!!!!!!!!!!!!!!!!");
    this.bottomSheet.open(KiiBottomSheetCookiesComponent, {
        panelClass :"default-theme",
        disableClose:true,
        scrollStrategy: new NoopScrollStrategy()   //Avoid scrolling to top !
        }) 
    let subs = this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe(res => {
        console.log("We got the following result:",res);
        if (res) Cookies.accept();
        else Cookies.refuse();
        subs.unsubscribe();
      })    
  }
}
