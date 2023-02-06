import { NoteService } from './../note.service';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'ng-blog-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit, OnDestroy {
  note = '';

  player: any;
  duration = 0;
  currentTime = 0;
  isMuted = true;

  barWidth = '0%';

  firstTime = true;

  isPlaying = false;

  updTimeLine: any;

  toc: TOC[] = [];

  @ViewChild('bar') bar!: ElementRef;

  constructor(
    private noteService: NoteService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnDestroy(): void {
    clearInterval(this.updTimeLine);
  }

  async ngOnInit() {
    await this.getNote();

    await this.getTOC()

    // this.setupYT();
  }

  setupYT() {
    const script = this._renderer2.createElement('script');
    script.type = 'text/javascript';
    script.id = 'www-widgetapi-script';
    script.src = '/assets/ytapi.js';

    this._renderer2.appendChild(this._document.head, script);
    if ((window as any).YT) {
      this.onYouTubeIframeAPIReady();
    }
  }

  onYouTubeIframeAPIReady() {
    this.player = new (window as any).YT.Player('player', {
      height: '196',
      width: '348',
      videoId: 'nfQkhXKk_IQ',
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        playsinline: 1,
        origin: 'https://kiwijang.github.io',
      },
      events: {
        onReady: this.onPlayerReady.bind(this),
      },
    });
  }

  // 4. The API will call this function when the video player is ready.
  onPlayerReady(event: any) {
    this.isMuted = event.target.isMuted();

    // event.target.playVideo();
    this.player = event.target;
    // console.log(player)

    // this.checkIsMuted();
    // this.player.seekTo(0);
    // this.playMyVedio();
    // this.isPlaying = true;

    this.duration = this.player.getDuration();

    this.currentTime = this.player.getCurrentTime();
    this.barWidth = String((this.currentTime / this.duration) * 100) + '%';

    if (this.firstTime) {
      // 更新時間條
      this.updTimeLine = setInterval(() => {
        if (this.player.getPlayerState() === 1) {
          this.isPlaying = true;
        } else if (this.player.getPlayerState() === 2) {
          this.isPlaying = false;
        }

        if (!this.bar.nativeElement) {
          clearInterval(this.updTimeLine);
          return;
        }
        this.currentTime = this.player.getCurrentTime();
        this.barWidth = String((this.currentTime / this.duration) * 100) + '%';
      }, 1000);

      this.firstTime = false;
    }
  }

  async getNote() {
    const res = await this.noteService.getHtmlText();
    this.note = await res.text();
  }

  async getTOC() {
    const res = await this.noteService.getTOC();
    this.toc = await res.json();
    console.log(this.toc)
  }


  stopVideo() {
    if (!this.player) return;
    this.player.seekTo(0);
    this.pauseVideo();
    this.isPlaying = false;
    // this.player.stopVideo();
  }

  pauseVideo() {
    if (!this.player) return;
    this.player.pauseVideo();
  }

  playMyVedio() {
    if (!this.player) return;
    this.player.playVideo();
  }

  unMute() {
    this.checkIsMuted();
  }

  mute() {
    this.checkIsMuted();
  }

  checkIsMuted() {
    if (!this.player) return;

    if (this.isMuted) {
      this.player.unMute();
    } else {
      this.player.mute();
    }

    this.isMuted = !this.isMuted;
  }

  barClicked(e: any) {
    const x = e.offsetX;
    let seekToTime = 0;
    const barWidth = (e.target as any).offsetWidth;
    if (this.player) {
      this.duration = this.player.getDuration();
      seekToTime = Math.floor((x / barWidth) * this.duration);
      this.player.seekTo(seekToTime);
    }

    this.currentTime = this.player.getCurrentTime();
    this.barWidth = String((this.currentTime / this.duration) * 100) + '%';
  }
}


export type TOC = {
  value: string;
  level: string;
}
