import { Component, OnInit } from '@angular/core';
import { Cookies } from 'src/app/_features/common/utils/cookies';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  cookies:boolean = false;
  constructor() { }

  ngOnInit() {
      this.cookies = Cookies.areAccepted();
  }

}
