import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'kii-http-error',
  templateUrl: './kii-http-error.component.html',
  styleUrls: ['./kii-http-error.component.scss']
})
export class KiiHttpErrorComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, 
              @Inject(PLATFORM_ID) private _platformId: any,
              private bottomSheetRef: MatBottomSheetRef<KiiHttpErrorComponent>) { }

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      setTimeout(()=> {
        this.bottomSheetRef.dismiss();
      },66000);
    }
  }

}
