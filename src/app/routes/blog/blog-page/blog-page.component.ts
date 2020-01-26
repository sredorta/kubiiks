import { Component, OnInit } from '@angular/core';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  constructor(private trans: KiiLanguageService) { }

  ngOnInit() {
  }

  switch() {
    if (this.trans.getCurrent() == 'fr') this.trans.use('en');
    else this.trans.use('fr');

  }
}
