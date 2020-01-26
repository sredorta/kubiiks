import { Component, OnInit, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { KiiViewTransferService } from '../../services/kii-view-transfer.service';
import { KiiInjectorService } from '../../services/kii-injector.service';
import { isPlatformBrowser } from '@angular/common';
import { MatBottomSheet } from '@angular/material';
import { KiiBottomSheetCookiesComponent } from '../kii-bottom-sheet-cookies/kii-bottom-sheet-cookies.component';
import { Cookies } from '../../utils/cookies';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { KiiLanguageService } from '../../services/kii-language.service';

@Component({
  selector: 'kii-app',
  templateUrl: './kii-app.component.html',
  styleUrls: ['./kii-app.component.scss'],
})
export class KiiAppComponent implements OnInit {

  constructor(
    injector:Injector, 
    private transfer: KiiViewTransferService,
    @Inject(PLATFORM_ID) private platform: any,
    private bottomSheet: MatBottomSheet,
    private kiiLang: KiiLanguageService
    
    ) {
    KiiInjectorService.setInjector(injector); //Store the injector so that we can access it later
    this.transfer.scroll(); //Handle scroll when transfer server/browser
  }

  ngOnInit() {

    if (isPlatformBrowser(this.platform)) {
      let lang$ = this.kiiLang.onLoaded.subscribe(res => {
        lang$.unsubscribe();
        //CHECK FOR COOKIES
        if (!Cookies.areAccepted()) {
          this.openBottomSheetCookies();
        }

      });


    }  
  }

  /** Shows cookies acceptance bottom sheet */
  openBottomSheetCookies(): void {
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
