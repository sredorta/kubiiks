import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private trans: TranslateService) { }

  ngOnInit() {
  }

  switch() {
    if (this.trans.currentLang == 'fr') this.trans.use('en');
    else this.trans.use('fr');

  }
}
