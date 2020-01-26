import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactPageComponent } from '../contact-page/contact-page.component';
import { KiiCommonModule } from 'src/app/_features/common/kii-common.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ContactPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    KiiCommonModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }
