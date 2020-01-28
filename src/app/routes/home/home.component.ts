import { Component, OnInit } from '@angular/core';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  count1 = 20;
  count2 = 30;
  param = {count1:this.count1, count2:this.count2};

  constructor(private trans: KiiLanguageService) { }

  ngOnInit() {

  }
  reload() {
    this.count1++;
    this.count2++;
  }

}
