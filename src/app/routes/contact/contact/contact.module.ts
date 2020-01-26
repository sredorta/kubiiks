import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactPageComponent } from '../contact-page/contact-page.component';
import { KiiCommonModule } from 'src/app/_features/common/kii-common.module';



@NgModule({
  declarations: [ContactPageComponent],
  imports: [
    CommonModule,
    KiiCommonModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }
