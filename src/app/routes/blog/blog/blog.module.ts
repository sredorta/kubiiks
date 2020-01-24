import { NgModule } from '@angular/core';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogPageComponent } from '../blog-page/blog-page.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { KiiTranslateBrowserLoader } from 'src/app/_features/common/utils/kii-translate-browser-loader';
import { KiiCommonModule } from 'src/app/_features/common/kii-common.module';


@NgModule({
  declarations: [
    BlogPageComponent,
  ],
  imports: [
    BlogRoutingModule,
    KiiCommonModule,
    //Each Lazy module needs to load it's translation files
    TranslateModule
  ]
})
export class BlogModule { }
