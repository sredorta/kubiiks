import { NgModule } from '@angular/core';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogPageComponent } from '../blog-page/blog-page.component';
import { TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { KiiCommonModule } from 'src/app/_features/common/kii-common.module';


@NgModule({
  declarations: [
    BlogPageComponent,
  ],
  imports: [
    BlogRoutingModule,
    KiiCommonModule,
    //Each Lazy module needs to load it's translation files
  ]
})
export class BlogModule { }
