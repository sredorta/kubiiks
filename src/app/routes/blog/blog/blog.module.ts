import { NgModule } from '@angular/core';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogPageComponent } from '../blog-page/blog-page.component';
import { TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { KiiCommonModule } from 'src/app/_features/common/kii-common.module';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatRippleModule, MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [
    BlogPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    [
      MatButtonModule,
      MatRippleModule
    ],
    KiiCommonModule,
    BlogRoutingModule,
  ],
})
export class BlogModule { }
