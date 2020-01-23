import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'kubiiks';
  constructor(private trans : TranslateService) {}

  ngOnInit() {
    console.log("Setting lang to fr");
    this.trans.setDefaultLang('fr');
    this.trans.use('fr');
  }
}
