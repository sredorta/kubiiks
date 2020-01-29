import { Component, OnInit } from '@angular/core';
import { INewsletter, KiiApiNewsletterService } from '../../services/kii-api-newsletter.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';

@Component({
  selector: 'kii-newsletter',
  templateUrl: './kii-newsletter.component.html',
  styleUrls: ['./kii-newsletter.component.scss']
})
export class KiiNewsletterComponent extends KiiBaseAbstract implements OnInit {

  constructor(private kiiApiNews : KiiApiNewsletterService) { super(); }

  ngOnInit() {
  }

  register(value:INewsletter) {
    this.addSubscriber(
      this.kiiApiNews.subscribeNews(value).subscribe(res => {
        console.log("GOT RESULT : ", res);
      }, error => {
        console.log("GOT ERROR : ",error);
      })
    )
  }

}
