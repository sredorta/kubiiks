import { Component, OnInit } from '@angular/core';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';
import { Router } from '@angular/router';
import { KiiFeatureAbstract } from 'src/app/abstracts/kii-feature.abstract';

@Component({
  selector: 'app-blog',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent extends KiiFeatureAbstract implements OnInit {

  constructor() { 
    super(['main']); 
  }

  ngOnInit() {
    this.init();
  }

}
