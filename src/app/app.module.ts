import { BrowserModule, TransferState, StateKey, makeStateKey, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, Inject, PLATFORM_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  //MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  //MatGridListModule,
  //MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  //MatNativeDateModule,
  MatPaginatorModule,
  //MatProgressBarModule,
  //MatProgressSpinnerModule,
  //MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  //MatSidenavModule,
  //MatSliderModule,
  //MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  //MatStepperModule,
  //MatTableModule,
  //MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  //MatTreeModule,
  //MatPaginatorIntl,
  //MatSnackBar,
  //MatDialogRef,
  //MatBottomSheetRef
} from '@angular/material';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { Router, Scroll, RouterEvent } from '@angular/router';
import { ViewportScroller, isPlatformServer} from '@angular/common';
import { filter } from 'rxjs/operators';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    [  MatAutocompleteModule, //MATERIAL DESIGN
      MatBadgeModule,
      MatBottomSheetModule,
      MatButtonModule,
      //MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      //MatGridListModule,
      //MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      //MatNativeDateModule,
      MatPaginatorModule,
      //MatProgressBarModule,
      //MatProgressSpinnerModule,
      //MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      //MatSidenavModule,
      //MatSliderModule,
      //MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      //MatStepperModule,
      //MatTableModule,
      //MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      //MatTreeModule
    ],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    router: Router, 
    viewportScroller: ViewportScroller,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private _platformId: any
    ) {
      //We save a key called transfer-server to detect if it's first time we get into browser comming from server
      // if it's the case we don't touch scroll to make smooth transition server/browser
      const key: StateKey<boolean> = makeStateKey<boolean>('scroll');
      let isFirstBrowser : boolean = false;
      if (isPlatformServer(this._platformId)) {
        this.transferState.set(key, true);
      } else {
        isFirstBrowser = this.transferState.get(key, false);
      }
      console.log("isFirstBrowser returns", isFirstBrowser);

    router.events.subscribe(e => {
      if (e instanceof Scroll) {
        if (e.position) {
          // backward navigation
          viewportScroller.scrollToPosition(e.position);
        } else if (isFirstBrowser) {
          // Do not touch scroll if we come from server
          isFirstBrowser = false;
        } else {
          // forward navigation
          viewportScroller.scrollToPosition([0, 0]);
        }
      }
    })
  }
 }
