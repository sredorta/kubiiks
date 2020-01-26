//Each feature has a common part and here we add it
import {Subscription} from 'rxjs';
import { KiiBaseAbstract } from './kii-base.abstract';
import { KiiInjectorService } from '../_features/common/services/kii-injector.service';
import { Injector, PLATFORM_ID } from '@angular/core';
import { KiiLanguageService } from '../_features/common/services/kii-language.service';
import { isPlatformBrowser } from '@angular/common';
import { Cookies } from '../_features/common/utils/cookies';
import { KiiBottomSheetCookiesComponent } from '../_features/common/components/kii-bottom-sheet-cookies/kii-bottom-sheet-cookies.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { MatBottomSheet } from '@angular/material';

export abstract class KiiFeatureAbstract extends KiiBaseAbstract  {
  protected injector:Injector;
  protected platform: any;
  protected kiiLang: KiiLanguageService;
  protected bottomSheet: MatBottomSheet;
  protected langContext:string[];
  constructor(langContext:string[]) {
    super();
    console.log("IN KII FEATURE ABSTRACT !");
    this.injector = KiiInjectorService.getInjector();
    this.kiiLang = this.injector.get(KiiLanguageService);
    this.platform = this.injector.get(PLATFORM_ID);
    this.bottomSheet = this.injector.get(MatBottomSheet);
    this.langContext = langContext;
    console.log("PLATFORM_ID:", this.platform);
  }

  init() {
    this.kiiLang.setRequiredContext(this.langContext);

    if (isPlatformBrowser(this.platform)) {
      console.log("WE ARE NOW HERE !!!!");
      let lang$ = this.kiiLang.onLoaded.subscribe(res => {
        console.log("LANG RESULTS ARE THERE !!!");
        lang$.unsubscribe();
        //CHECK FOR COOKIES
        if (!Cookies.areAccepted()) {
          this.openBottomSheetCookies();
        }

      });
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