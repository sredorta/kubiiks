import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  constructor(private trans: TranslateService) { }

  ngOnInit() {
  }

  switch() {
    if (this.trans.currentLang == 'fr') this.trans.use('en');
    else this.trans.use('fr');

  }
}
