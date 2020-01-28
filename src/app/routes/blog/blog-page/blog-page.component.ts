import { Component, OnInit } from '@angular/core';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent  implements OnInit {

  constructor(public kiiLang:KiiLanguageService) { 

  }

  ngOnInit() {
    this.kiiLang.setRequiredContext(['main']);

  }
  ngAfterViewInit() {

  }

}
