"use strict";(self.webpackChunkng_blog=self.webpackChunkng_blog||[]).push([[228],{228:(f,p,r)=>{r.r(p),r.d(p,{NoteModule:()=>a});var u=r(895),d=r(322),e=r(256);class c{}c.\u0275fac=function(t){return new(t||c)},c.\u0275cmp=e.Xpm({type:c,selectors:[["ng-blog-notelist"]],decls:2,vars:0,template:function(t,n){1&t&&(e.TgZ(0,"p"),e._uU(1,"notelist works!"),e.qZA())}});var h=r(99);class s{getHtmlText(){return fetch("/notes/o7mp336qqwyjf1d0jefmg53.html")}getTOC(){return fetch("/notes/o7mp336qqwyjf1d0jefmg53.json")}}s.\u0275fac=function(t){return new(t||s)},s.\u0275prov=e.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"});const g=["bar"];class l{constructor(t,n,o){this.noteService=t,this._renderer2=n,this._document=o,this.note="",this.duration=0,this.currentTime=0,this.isMuted=!0,this.barWidth="0%",this.firstTime=!0,this.isPlaying=!1,this.toc=[]}ngOnDestroy(){clearInterval(this.updTimeLine)}ngOnInit(){var t=this;return(0,h.Z)(function*(){yield t.getNote(),yield t.getTOC()})()}setupYT(){const t=this._renderer2.createElement("script");t.type="text/javascript",t.id="www-widgetapi-script",t.src="/assets/ytapi.js",this._renderer2.appendChild(this._document.head,t),window.YT&&this.onYouTubeIframeAPIReady()}onYouTubeIframeAPIReady(){this.player=new window.YT.Player("player",{height:"196",width:"348",videoId:"nfQkhXKk_IQ",playerVars:{autoplay:0,controls:0,loop:1,playsinline:1,origin:"https://kiwijang.github.io"},events:{onReady:this.onPlayerReady.bind(this)}})}onPlayerReady(t){this.isMuted=t.target.isMuted(),this.player=t.target,this.duration=this.player.getDuration(),this.currentTime=this.player.getCurrentTime(),this.barWidth=String(this.currentTime/this.duration*100)+"%",this.firstTime&&(this.updTimeLine=setInterval(()=>{1===this.player.getPlayerState()?this.isPlaying=!0:2===this.player.getPlayerState()&&(this.isPlaying=!1),this.bar.nativeElement?(this.currentTime=this.player.getCurrentTime(),this.barWidth=String(this.currentTime/this.duration*100)+"%"):clearInterval(this.updTimeLine)},1e3),this.firstTime=!1)}getNote(){var t=this;return(0,h.Z)(function*(){const n=yield t.noteService.getHtmlText();t.note=yield n.text()})()}getTOC(){var t=this;return(0,h.Z)(function*(){const n=yield t.noteService.getTOC();t.toc=yield n.json(),console.log(t.toc)})()}stopVideo(){this.player&&(this.player.seekTo(0),this.pauseVideo(),this.isPlaying=!1)}pauseVideo(){this.player&&this.player.pauseVideo()}playMyVedio(){this.player&&this.player.playVideo()}unMute(){this.checkIsMuted()}mute(){this.checkIsMuted()}checkIsMuted(){this.player&&(this.isMuted?this.player.unMute():this.player.mute(),this.isMuted=!this.isMuted)}barClicked(t){const n=t.offsetX;let o=0;const y=t.target.offsetWidth;this.player&&(this.duration=this.player.getDuration(),o=Math.floor(n/y*this.duration),this.player.seekTo(o)),this.currentTime=this.player.getCurrentTime(),this.barWidth=String(this.currentTime/this.duration*100)+"%"}}l.\u0275fac=function(t){return new(t||l)(e.Y36(s),e.Y36(e.Qsj),e.Y36(u.K0))},l.\u0275cmp=e.Xpm({type:l,selectors:[["ng-blog-note"]],viewQuery:function(t,n){if(1&t&&e.Gf(g,5),2&t){let o;e.iGM(o=e.CRH())&&(n.bar=o.first)}},decls:1,vars:1,consts:[[3,"innerHTML"]],template:function(t,n){1&t&&e._UZ(0,"div",0),2&t&&e.Q6J("innerHTML",n.note,e.oJD)},styles:["#wrap[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;width:350px;border-radius:5px;box-shadow:0 2px 5px #aaa;padding:8px 8px 5px;margin:20px}@media (max-width: 440px){#wrap[_ngcontent-%COMP%]{display:none}}#bar-wrap[_ngcontent-%COMP%]{margin:5px 0;width:100%;height:10px;background-color:#eee;cursor:pointer}#bar[_ngcontent-%COMP%]{width:0%;height:10px;background-color:#aaa;pointer-events:none}#btn-area[_ngcontent-%COMP%]{flex:1 1 60%;display:flex;align-items:center}#btn-play[_ngcontent-%COMP%], #btn-pause[_ngcontent-%COMP%], #btn-stop[_ngcontent-%COMP%], #btn-mute[_ngcontent-%COMP%], #btn-unMute[_ngcontent-%COMP%]{background-color:transparent;border:none;display:inline-flex;justify-content:center;align-items:center;cursor:pointer}#btn-play[_ngcontent-%COMP%]:hover, #btn-pause[_ngcontent-%COMP%]:hover, #btn-stop[_ngcontent-%COMP%]:hover, #btn-mute[_ngcontent-%COMP%]:hover, #btn-unMute[_ngcontent-%COMP%]:hover{color:#ccc}#btn-play[_ngcontent-%COMP%]:active, #btn-pause[_ngcontent-%COMP%]:active, #btn-stop[_ngcontent-%COMP%]:active{color:#aaa}.h-5[_ngcontent-%COMP%]{height:20px}.w-5[_ngcontent-%COMP%]{width:20px}.playingText[_ngcontent-%COMP%]{flex:1 1 40%;color:gray;font-size:12px;display:flex;align-items:center}.wrap-panel[_ngcontent-%COMP%]{margin-top:5px;display:flex;width:100%}"]});class a{}a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[u.ez,d.Bz.forChild([{path:"",component:c},{path:":id",component:l}])]})}}]);