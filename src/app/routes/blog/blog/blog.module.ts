import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogPageComponent } from '../blog-page/blog-page.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { KiiTranslateBrowserLoader } from 'src/app/features/common/utils/kii-translate-browser-loader';


@NgModule({
  declarations: [BlogPageComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    //Each Lazy module needs to load it's translation files
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: KiiTranslateBrowserLoader.getFactory('blog'),
          deps: [HttpClient, TransferState]
      }
    }),
  ]
})
export class BlogModule { }
