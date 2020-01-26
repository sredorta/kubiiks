import { Injectable,Inject,PLATFORM_ID } from '@angular/core';
import { Router, Scroll, RouterEvent } from '@angular/router';
import { ViewportScroller, isPlatformServer} from '@angular/common';
import { filter } from 'rxjs/operators';
import { TransferState, StateKey, makeStateKey } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})

export class KiiStateTransferService {
  router : Router;
  viewportScroller : ViewportScroller;
  constructor(
    router: Router, 
    viewportScroller: ViewportScroller,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private _platformId: any
  ) { 
    this.router = router;
    this.viewportScroller = viewportScroller;
  }

  /**Handles the scroll when we transfer server/browser*/
  scroll() {
    const key: StateKey<boolean> = makeStateKey<boolean>('transfer-scroll');
    let isFirstBrowser : boolean = false;
    if (isPlatformServer(this._platformId)) {
      this.transferState.set(key, true);
    } else {
      isFirstBrowser = this.transferState.get(key, false);
    }
    console.log("isFirstBrowser returns", isFirstBrowser);
    this.router.events.subscribe(e => {
      if (e instanceof Scroll) {
        if (e.position) {
          // backward navigation
          this.viewportScroller.scrollToPosition(e.position);
        } else if (isFirstBrowser) {
          // Do not touch scroll if we come from server
          isFirstBrowser = false;
        } else {
          // forward navigation
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      }
    })
  }

  /**Saves translations to the transfer state table */
  saveTranslations(context:string,data:any) {
    const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + context);
    this.transferState.set(key, data);
  }

  /**Restores translations from the transfer state table, returns null if there aren't */
  restoreTranslations(context:string) {
    const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + context);
    return this.transferState.get(key, null);
  }

}
