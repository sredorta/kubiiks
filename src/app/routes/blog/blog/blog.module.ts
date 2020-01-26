import { NgModule } from '@angular/core';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogPageComponent } from '../blog-page/blog-page.component';
import { TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { KiiCommonModule } from 'src/app/_features/common/kii-common.module';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    BlogPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    KiiCommonModule,
    BlogRoutingModule,
    //Each Lazy module needs to load it's translation files
  ],
})
export class BlogModule { }
