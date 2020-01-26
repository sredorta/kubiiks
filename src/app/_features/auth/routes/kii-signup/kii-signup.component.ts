import { Component, OnInit } from '@angular/core';
import { KiiLanguageService } from 'src/app/_features/common/services/kii-language.service';

@Component({
  selector: 'app-kii-signup',
  templateUrl: './kii-signup.component.html',
  styleUrls: ['./kii-signup.component.scss']
})
export class KiiSignupComponent implements OnInit {

  constructor(private trans:KiiLanguageService) { }

  ngOnInit() {

  }

}
