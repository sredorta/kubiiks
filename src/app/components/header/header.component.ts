import { Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { isPlatformBrowser } from '@angular/common';
import { KiiViewTransferService } from 'src/app/_features/common/services/kii-view-transfer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showVideo:boolean = false;
  video : HTMLVideoElement = null;
  isPlaying : boolean = false;
  canPlayVideo : boolean = false;
  isMobile : boolean = this.device.isMobile();
  format : string ="default";
  isTransfer : boolean = this.transfer.isTransfer;

  @ViewChild('videoPlayer',{static:false}) videoplayer: ElementRef;

  constructor(private device : DeviceDetectorService, 
            @Inject(PLATFORM_ID) private platformId: any, 
            private transfer: KiiViewTransferService
            ) { }

  ngOnInit() {
      this.showVideo = isPlatformBrowser(this.platformId);
  }
  ngAfterViewInit() {
    if (this.showVideo) {
      this.video = this.videoplayer.nativeElement;
      this.video.oncanplaythrough = () => {
      }
      this.video.onplaying = () => {
        this.isPlaying = true;
      }
    }
  }

}
