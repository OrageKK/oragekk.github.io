var y=Object.defineProperty;var v=(d,t,i)=>t in d?y(d,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):d[t]=i;var n=(d,t,i)=>(v(d,typeof t!="symbol"?t+"":t,i),i);import{v as p,D as l,E as T,w as u,x as b,y as C,z as E,A as U,L as c,S as w,B as g,I as L,k as f,F as j,G as S,H as _,J as A,K as N,M as R,N as m,O as M,Q as O,R as I,U as D,l as $}from"./register-4d739e9b.js";class k{constructor(t){n(this,"Lh");this._e=t}M(){f(this.Lh)&&this.Mh()}N(){j(this.Lh)&&window.cancelAnimationFrame(this.Lh),this.Lh=void 0}Mh(){this.Lh=window.requestAnimationFrame(()=>{f(this.Lh)||(this._e(),this.Mh())})}}const q=d=>S(d);class F{constructor(t){n(this,"ph");n(this,"Ca",null);n(this,"uh",null);n(this,"nh",{});n(this,"oh",new Set);this.ta=t}get instance(){return this.Ca}setup(t,i){this.ph=i;const s=p(i.$store.streamType).includes("live"),a=p(i.$store.streamType).includes("ll-");this.Ca=new t({lowLatencyMode:a,backBufferLength:a?4:s?8:void 0,renderTextTracksNatively:!1,...this.nh});const e=this.vh.bind(this);for(const h of Object.values(t.Events))this.Ca.on(h,e);this.Ca.on(t.Events.ERROR,this.Zb.bind(this));for(const h of this.oh)h(this.Ca);i.player.dispatchEvent(new l("hls-instance",{detail:this.Ca})),this.Ca.attachMedia(this.ta),this.Ca.on(t.Events.AUDIO_TRACK_SWITCHED,this.wh.bind(this)),this.Ca.on(t.Events.LEVEL_SWITCHED,this.xh.bind(this)),this.Ca.on(t.Events.LEVEL_LOADED,this.yh.bind(this)),this.Ca.on(t.Events.NON_NATIVE_TEXT_TRACKS_FOUND,this.zh.bind(this)),this.Ca.on(t.Events.CUES_PARSED,this.Ah.bind(this)),i.qualities[T]=this.Bh.bind(this),u(i.qualities,"change",this.Rf.bind(this)),u(i.audioTracks,"change",this.Ch.bind(this)),this.uh=b(this.Dh.bind(this))}Dh(){if(!this.ph.$store.live())return;const t=new k(this.Eh.bind(this));return t.M(),t.N.bind(t)}Eh(){var t;this.ph.$store.liveSyncPosition.set(((t=this.Ca)==null?void 0:t.liveSyncPosition)??1/0)}vh(t,i){this.ph.player.dispatchEvent(new l(q(t),{detail:i}))}zh(t,i){const s=new l(t,{detail:i});let a=-1;for(let e=0;e<i.tracks.length;e++){const h=i.tracks[e],o=h.subtitleTrack??h.closedCaptions,r=new C({id:`hls-${h.kind}${e}`,src:o==null?void 0:o.url,label:h.label,language:o==null?void 0:o.lang,kind:h.kind});r[E]=2,r[U]=()=>{r.mode==="showing"?(this.Ca.subtitleTrack=e,a=e):a===e&&(this.Ca.subtitleTrack=-1,a=-1)},h.default&&r.setMode("showing",s),this.ph.textTracks.add(r,s)}}Ah(t,i){const s=this.ph.textTracks.getById(`hls-${i.track}`);if(!s)return;const a=new l(t,{detail:i});for(const e of i.cues)e.positionAlign="auto",s.addCue(e,a)}wh(t,i){const s=this.ph.audioTracks[i.id];s&&this.ph.audioTracks[c](s,!0,new l(t,{detail:i}))}xh(t,i){const s=this.ph.qualities[i.level];s&&this.ph.qualities[c](s,!0,new l(t,{detail:i}))}yh(t,i){if(this.ph.$store.canPlay())return;const{type:s,live:a,totalduration:e}=i.details,h=new l(t,{detail:i});this.ph.delegate.U("stream-type-change",{detail:a?s==="EVENT"&&Number.isFinite(e)?"live:dvr":"live":"on-demand",trigger:h}),this.ph.delegate.U("duration-change",{detail:e,trigger:h});const o=this.Ca.media;this.Ca.currentLevel===-1&&this.ph.qualities[w](!0,h);for(const r of this.Ca.audioTracks)this.ph.audioTracks[g]({id:r.id+"",label:r.name,language:r.lang||"",kind:"main"},h);for(const r of this.Ca.levels)this.ph.qualities[g]({width:r.width,height:r.height,codec:r.codecSet,bitrate:r.bitrate},h);o.dispatchEvent(new l("canplay",{trigger:h}))}Zb(t,i){var s,a,e;if(i.fatal)switch(i.type){case"networkError":(s=this.Ca)==null||s.startLoad();break;case"mediaError":(a=this.Ca)==null||a.recoverMediaError();break;default:(e=this.Ca)==null||e.destroy(),this.Ca=null;break}}Bh(){this.Ca&&(this.Ca.currentLevel=-1)}Rf(){const{qualities:t}=this.ph;!this.Ca||t.auto||(this.Ca[t.switch+"Level"]=t.selectedIndex,L&&(this.ta.currentTime=this.ta.currentTime))}Ch(){const{audioTracks:t}=this.ph;this.Ca&&this.Ca.audioTrack!==t.selectedIndex&&(this.Ca.audioTrack=t.selectedIndex)}Jg(){var t,i;this.ph&&(this.ph.qualities[T]=void 0),(t=this.Ca)==null||t.destroy(),this.Ca=null,(i=this.uh)==null||i.call(this),this.uh=null}}class V{constructor(t,i){n(this,"ih",A());n(this,"Vh",!1);n(this,"Yh",!1);n(this,"Zh",!1);n(this,"Wh",new k(this.ci.bind(this)));n(this,"vi");n(this,"xi");this.m=t,this.ph=i,this.ai(),b(this.bi.bind(this)),_(this.qh.bind(this))}get n(){return this.m.media}get jg(){return this.ph.delegate}qh(){this.Wh.N(),this.ih.empty()}ci(){const t=this.m.currentTime;this.ph.$store.currentTime()!==t&&this.Uh(t)}ai(){this.Th("loadstart",this.je),this.Th("abort",this._h),this.Th("emptied",this.di),this.Th("error",this.Zb)}ei(){this.Yh||(this.ih.add(this.Th("loadeddata",this.fi),this.Th("loadedmetadata",this.gi),this.Th("canplay",this.Ub),this.Th("canplaythrough",this.hi),this.Th("durationchange",this.ii),this.Th("play",this.ji),this.Th("progress",this.ki),this.Th("stalled",this.li),this.Th("suspend",this.mi)),this.Yh=!0)}ni(){this.Zh||(this.ih.add(this.Th("pause",this.oi),this.Th("playing",this.pi),this.Th("ratechange",this.qi),this.Th("seeked",this.ri),this.Th("seeking",this.si),this.Th("ended",this.ti),this.Th("volumechange",this.dc),this.Th("waiting",this.ui)),this.Zh=!0)}Th(t,i){return u(this.n,t,i.bind(this))}yi(t){}Uh(t,i){this.jg.U("time-update",{detail:{currentTime:Math.min(t,this.ph.$store.seekableEnd()),played:this.n.played},trigger:i})}je(t){if(this.n.networkState===3){this._h(t);return}this.ei(),this.jg.U("load-start",{trigger:t})}_h(t){this.jg.U("abort",{trigger:t})}di(){this.jg.U("emptied",{trigger:event})}fi(t){this.jg.U("loaded-data",{trigger:t})}gi(t){this.$h(),this.ni(),this.jg.U("volume-change",{detail:{volume:this.n.volume,muted:this.n.muted}}),this.jg.U("loaded-metadata",{trigger:t}),N&&R(this.ph.$store.source())&&this.jg.af(this.Xh(),t)}Xh(){return{duration:this.n.duration,buffered:this.n.buffered,seekable:this.n.seekable}}$h(){const t=!Number.isFinite(this.n.duration);this.jg.U("stream-type-change",{detail:t?"live":"on-demand"})}ji(t){this.ph.$store.canPlay&&this.jg.U("play",{trigger:t})}oi(t){this.n.readyState===1&&!this.Vh||(this.Vh=!1,this.Wh.N(),this.jg.U("pause",{trigger:t}))}Ub(t){this.jg.af(this.Xh(),t)}hi(t){this.ph.$store.started()||this.jg.U("can-play-through",{trigger:t,detail:this.Xh()})}pi(t){this.Vh=!1,this.jg.U("playing",{trigger:t}),this.Wh.M()}li(t){this.jg.U("stalled",{trigger:t}),this.n.readyState<3&&(this.Vh=!0,this.jg.U("waiting",{trigger:t}))}ui(t){this.n.readyState<3&&(this.Vh=!0,this.jg.U("waiting",{trigger:t}))}ti(t){this.Wh.N(),this.Uh(this.n.duration,t),this.jg.U("end",{trigger:t}),this.ph.$store.loop()?this.wi():this.jg.U("ended",{trigger:t})}bi(){this.ph.$store.paused()&&u(this.n,"timeupdate",this.Yb.bind(this))}Yb(t){this.Uh(this.n.currentTime,t)}ii(t){this.$h(),this.ph.$store.ended()&&this.Uh(this.n.duration,t),this.jg.U("duration-change",{detail:this.n.duration,trigger:t})}dc(t){this.jg.U("volume-change",{detail:{volume:this.n.volume,muted:this.n.muted},trigger:t})}ri(t){this.Uh(this.n.currentTime,t),this.jg.U("seeked",{detail:this.n.currentTime,trigger:t}),Math.trunc(this.n.currentTime)===Math.trunc(this.n.duration)&&m(this.n.duration)>m(this.n.currentTime)&&(this.Uh(this.n.duration,t),this.n.ended||this.ph.player.dispatchEvent(new l("media-play-request",{trigger:t})))}si(t){this.jg.U("seeking",{detail:this.n.currentTime,trigger:t})}ki(t){this.jg.U("progress",{detail:{buffered:this.n.buffered,seekable:this.n.seekable},trigger:t})}wi(){M(this.n.controls)&&(this.n.controls=!1),this.ph.player.dispatchEvent(new l("media-loop-request"))}mi(t){this.jg.U("suspend",{trigger:t})}qi(t){this.jg.U("rate-change",{detail:this.n.playbackRate,trigger:t})}Zb(t){const i=this.n.error;i&&this.jg.U("error",{detail:{message:i.message,code:i.code,mediaError:i},trigger:t})}}class B{constructor(t,i){this.m=t,this.ph=i,this.Nh.onaddtrack=this.Ph.bind(this),this.Nh.onremovetrack=this.Qh.bind(this),this.Nh.onchange=this.Rh.bind(this),u(this.ph.audioTracks,"change",this.Sh.bind(this))}get Nh(){return this.m.media.audioTracks}Ph(t){const i=t.track;if(i.label==="")return;const s={id:i.id+"",label:i.label,language:i.language,kind:i.kind,selected:!1};this.ph.audioTracks[g](s,t),i.enabled&&(s.selected=!0)}Qh(t){const i=this.ph.audioTracks.getById(t.track.id);i&&this.ph.audioTracks[O](i,t)}Rh(t){let i=this.Oh();if(!i)return;const s=this.ph.audioTracks.getById(i.id);s&&this.ph.audioTracks[c](s,!0,t)}Oh(){return Array.from(this.Nh).find(t=>t.enabled)}Sh(t){const{current:i}=t.detail;if(!i)return;const s=this.Nh.getTrackById(i.id);if(s){const a=this.Oh();a&&(a.enabled=!1),s.enabled=!0}}}class Y{constructor(t){this.n=t}setup(t){new V(this,t),"audioTracks"in this.media&&new B(this,t)}get type(){return""}get media(){return this.n}get paused(){return this.n.paused}get muted(){return this.n.muted}set muted(t){this.n.muted=t}get volume(){return this.n.volume}set volume(t){this.n.volume=t}get currentTime(){return this.n.currentTime}set currentTime(t){this.n.currentTime=t}get playsinline(){return this.n.hasAttribute("playsinline")}set playsinline(t){I(this.n,"playsinline",t)}get playbackRate(){return this.n.playbackRate}set playbackRate(t){this.n.playbackRate=t}async play(){return this.n.play()}async pause(){return this.n.pause()}async loadSource({src:t},i){this.n.preload=i,D(t)?this.n.srcObject=t:(this.n.srcObject=null,this.n.src=$(t)?t:window.URL.createObjectURL(t)),this.n.load()}}export{Y as H,F as a};
