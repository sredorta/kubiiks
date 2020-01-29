import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { KiiLanguageService } from '../../services/kii-language.service';
import { Cookies } from '../../utils/cookies';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { MatBottomSheet } from '@angular/material';
import { KiiBottomSheetCookiesComponent } from '../kii-bottom-sheet-cookies/kii-bottom-sheet-cookies.component';
import { KiiViewTransferService } from '../../services/kii-view-transfer.service';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';

@Component({
  selector: 'kii-app',
  templateUrl: './kii-app.component.html',
  styleUrls: ['./kii-app.component.scss']
})
export class KiiAppComponent extends KiiBaseAbstract implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platform: any,
              private kiiLang: KiiLanguageService,
              private viewTrans : KiiViewTransferService,
              private bottomSheet: MatBottomSheet,
              private router : Router,
              private location : Location) { super() }

  ngOnInit() {

    console.log("ONINIT: KIIAPP");
    this.viewTrans.scroll();

    //Sets language required context
    this.kiiLang.setRequiredContext(['main']);

    //Handle cookies
    if (isPlatformBrowser(this.platform)) {
      this.addSubscriber(
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe( (res : NavigationEnd) => {
          if (res.url.includes('cookies')) {
            this.bottomSheet.dismiss();
          } else {
            if (!Cookies.areAccepted()) {
              this.openBottomSheetCookies();
            }
          }
        })
      );
    }


  }
  openBottomSheetCookies(): void {
    this.bottomSheet.open(KiiBottomSheetCookiesComponent, {
        panelClass :"default-theme",
        disableClose:true,
        scrollStrategy: new NoopScrollStrategy()   //Avoid scrolling to top !
        }) 
    let subs = this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe(res => {
        if (res) Cookies.accept();
        else Cookies.refuse();
        subs.unsubscribe();
        //If our current route is /auth/cookies then navigate back
        //if (this.router.url.includes('cookies')) this.location.back();
      })    
  }
}
