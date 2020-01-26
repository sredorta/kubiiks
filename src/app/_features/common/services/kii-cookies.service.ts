//Transfer scroll position from server to browser
//This is a local service only available within common module

import { Injectable,Inject,PLATFORM_ID } from '@angular/core';
import { Router, Scroll, RouterEvent } from '@angular/router';
import { ViewportScroller, isPlatformServer} from '@angular/common';
import { filter } from 'rxjs/operators';
import { TransferState, StateKey, makeStateKey } from '@angular/platform-browser';
import { KiiCommonModule } from '../kii-common.module';


@Injectable({
  providedIn: 'root'
})

export class KiiCookiesService {

  constructor(
            @Inject(PLATFORM_ID) private _platformId: any
  ) { 

  }
  areAccepted() {
    if (localStorage.getItem("cookies") == "accepted") {
        //Check validity of cookies
        if (!localStorage.getItem("cookies-date")) return false;
        const date = Number.parseInt(localStorage.getItem("cookies-date"));
        const now = new Date().getTime();
        if ((now - date)>15552000000)  return false; //1000*60*60*24*180 = 6 months
        return true;
    }
    return false;
  }

  accept() {
    localStorage.setItem('cookies','accepted');
    localStorage.setItem('cookies-date', new Date().getTime().toString())
  }

  refuse() {
    localStorage.clear();
  }


}