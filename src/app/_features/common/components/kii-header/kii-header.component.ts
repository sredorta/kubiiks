import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import {DeviceDetectorService } from 'ngx-device-detector';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'kii-header',
  templateUrl: './kii-header.component.html',
  styleUrls: ['./kii-header.component.scss']
})
export class KiiHeaderComponent implements OnInit {

  showVideo:boolean = false;
  video : HTMLVideoElement = null;
  isPlaying : boolean = false;
  canPlayVideo : boolean = false;
  isMobile : boolean = this.device.isMobile();
  format : string ="default";
  @ViewChild('videoPlayer',{static:false}) videoplayer: ElementRef;

  constructor(private device : DeviceDetectorService, @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit() {
      this.showVideo = isPlatformBrowser(this.platformId)
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