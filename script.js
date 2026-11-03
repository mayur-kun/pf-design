(function(){
'use strict';

/* ---------------- data ---------------- */
var TABS=[
  {id:'now',label:'Building now'},
  {id:'exp',label:'Experiments'},
  {id:'earlier',label:'Earlier work'}
];
var PROJECTS=[
  {slug:'auralynk',tab:'now',shape:'flame',n:850,nd:1900,title:'Auralynk',kicker:'Product · XeroLabs',
   brief:'A social app for turning spontaneous plans into real-world adventures. Discover side-quests, bring your friends along and keep a record of the things you do together.',
   role:'Founder, product strategy and development.',statusLabel:'Status',status:'Live on iOS and Android.',
   tagsLabel:'Platforms',tags:['iOS','Android']},
  {slug:'sneek',tab:'now',shape:'card',title:'Sneek',kicker:'Game · XeroLabs',
   brief:'A multiplayer card game with a simple twist: everyone can see your cards except you. Read the table, figure out what you’re holding and outsmart everyone else.',
   role:'Concept, game design and development.',statusLabel:'Status',status:'In development.',
   tagsLabel:'Planned stack',tags:['Next.js','TanStack','Convex','Durable Objects']},
  {slug:'storyboard-generator',tab:'exp',shape:'frames',title:'Storyboard Generator',kicker:'Tool · Personal project',
   brief:'A tool for turning video ideas into structured storyboards. Built to plan AI-generated cooking videos, from individual shots to the final sequence.',
   role:'Design and development.',statusLabel:'Status',status:'Built for my own YouTube workflow.',
   tagsLabel:'Format',tags:['Web tool','AI video workflow']},
  {slug:'maprace',tab:'exp',shape:'terrain',title:'MapRace',kicker:'Game concept',
   brief:'What if Google Maps could become a racing game? MapRace explores turning real-world map screenshots into playable pixel-art tracks, with an in-game economy built around generated assets.',
   role:'Concept and game design.',statusLabel:'Status',status:'Concept.',
   tagsLabel:'Core ideas',tags:['Map screenshots','AI conversion','Pixel art','Asset economy']},
  {slug:'lead-prioritization',tab:'earlier',shape:'funnel',title:'Lead Prioritization & Sales Insights Engine',kicker:'Freelance · AI Consultant',
   brief:'An AI-assisted sales workflow that scores leads, identifies intent and sentiment, and generates actionable briefs for sales teams.',
   role:'AI consultant.',statusLabel:'Outcome',status:'Reduced manual lead-triage time by 40%.',
   tagsLabel:'Topics',tags:['Lead scoring','Sentiment','CRM']},
  {slug:'document-processing',tab:'earlier',shape:'sheets',title:'AI-Powered Document Processing',kicker:'Freelance · AI Consultant',
   brief:'A document intelligence pipeline that extracts structured information from noisy OCR scans and receipts, reducing repetitive manual processing.',
   role:'AI consultant.',statusLabel:'Outcome',status:'85%+ accuracy in multiclass inquiry classification and approximately 60% less repetitive manual work.',
   tagsLabel:'Topics',tags:['OCR','LLMs','Classification']},
  {slug:'inquiry-agent',tab:'earlier',shape:'orb',title:'Customer Inquiry Handling Agent',kicker:'Freelance · AI Consultant',
   brief:'An AI-powered support assistant that interprets incoming web submissions, identifies urgency and sentiment, and recommends the next step for support teams.',
   role:'AI consultant.',statusLabel:'Outcome',status:'Structured, actionable context for every incoming inquiry.',
   tagsLabel:'Topics',tags:['LLMs','Sentiment','Support']},
  {slug:'data-lake-ingestion',tab:'earlier',shape:'waves',title:'Azure Data Lake Ingestion Suite',kicker:'Aditya Birla Management Corporation · Data Engineer',
   brief:'Built data ingestion pipelines with Azure Data Factory and ADLS Gen2, handling deeply nested JSON structures at scale.',
   role:'Data engineer, Aditya Birla Management Corporation.',statusLabel:'Outcome',status:'Reduced compute and storage costs.',
   tagsLabel:'Stack',tags:['Azure Data Factory','ADLS Gen2','JSON']},
  {slug:'data-quality',tab:'earlier',shape:'lattice',title:'Data Quality Automation Framework',kicker:'Aditya Birla Management Corporation · Data Engineer',
   brief:'A data validation framework using Apache Spark and Great Expectations to automate checks, standardise testing and make data quality easier to maintain.',
   role:'Data engineer, Aditya Birla Management Corporation.',statusLabel:'Outcome',status:'Automated validation, standardised runbooks and documentation.',
   tagsLabel:'Stack',tags:['Apache Spark','Great Expectations']}
];

/* ---------------- helpers ---------------- */
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function ttl(s){return esc(s).replace(/&amp;/g,'<span class="amp">&amp;</span>')}
var ICON_COPY='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1"/><path d="M10.5 3.5v-1h-8v8h1"/></svg>';
var ICON_EXPAND='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2.5 6V2.5H6M10 2.5h3.5V6M13.5 10v3.5H10M6 13.5H2.5V10"/></svg>';

/* ---------------- stipple engine ---------------- */
var TAU=Math.PI*2;
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function hash3(x,y,z){var h=(Math.imul(x,374761393)+Math.imul(y,668265263)+Math.imul(z,1013904223))|0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967295}
function sm(t){return t*t*(3-2*t)}
function noise3(x,y,z){
  var xi=Math.floor(x),yi=Math.floor(y),zi=Math.floor(z),xf=sm(x-xi),yf=sm(y-yi),zf=sm(z-zi);
  function L(a,b,t){return a+(b-a)*t}
  return L(
    L(L(hash3(xi,yi,zi),hash3(xi+1,yi,zi),xf),L(hash3(xi,yi+1,zi),hash3(xi+1,yi+1,zi),xf),yf),
    L(L(hash3(xi,yi,zi+1),hash3(xi+1,yi,zi+1),xf),L(hash3(xi,yi+1,zi+1),hash3(xi+1,yi+1,zi+1),xf),yf),zf);
}
function gz(r){return (r()+r()+r()-1.5)*0.8}

var GLYPH=null;
function glyphData(){
  if(GLYPH)return GLYPH;
  var W=66,H=120,raw=atob('AAAAAQAAAAAAAAAAYAAAAAAAAAAOAAAAAAAAAAHAAAAAAAAAAHwAAAAAAAAAD4AAAAAAAAAD8AAAAAAAAAD/AAAAAAAAAD/gAAAAAAAAD/wAAAAAAAAD/4AAAAAAAAD/8AAAAAAAAD/+AAAAAAAAH/+AAAAAAAAH//AAAAAAAAH//gAAAAAAAP//gAAAAAAAP//wAAAAAAAf//4AAAAAAAf//4AAAAAAA///4AAAAAAA///8AAAAAAB///8AAAAAAB///8AAAAAAD///+AAAAAAH///+AAAAAAH///+AAAAAAP///+AAAAAAP///+AAAAAAf///+AAAAAA////+AAAAAA////+AAAAAB////+AAAAAD////+AAAAAH////+AAAAAH////+AAAAAP////+AAAAAf////+AAAAA/////+AAAAA/////8AAAAB/////8AAAAD/////8AAAAH///x/8AAAAH///g/4AAAAP///g/4AAAAf///A/4AAAAf//+A/wAAAA///+A/wAAAB///8A/wAAAB///4A/gAAAD///4A/gAAAH///wA/gAAAH///gA/AAAAP///gA/AAAAf///AA+AAAAf///AA+AAAA///+AA8AAAA///+AA8AAAB///8AAYAAAB///8AAYAAAD///8AAQAAAD///4AAQAAAH///4AAAAAAH///wAAAAAAH///wAAAAAAP///wAwAAAAP///wAcAAAAf///gAPAAAAf///gAHwAAAf///gAD4AAAf///gAD+AAA////gAB/gAA////gAA/wAA////gAA/8AA////gAAf+AA////gAAf/gA////AAAP/wA////gAAP/4A////gAAP/8A////gAAH/+A////gAAH//Af///gAAH//gf///gAAH//wf///gAAD//4f///gAAD//4P///gAAD//8P///wAAD//8H///wAAD//+H///wAAD//+D///wAAD///B///4AAD///B///4AAD///A///4AAD///Af//4AAD///AP//8AAD///AH//8AAD///AD//8AAD//+AB//+AAH//+AAf/+AAH//+AAP//AAH//8AAH//AAH//8AAB//AAP//4AAA//gAP//wAAAP/gAP//gAAAD/wAf//gAAAB/wAf//AAAAAf4Af/8AAAAAH4A//4AAAAAB4A//wAAAAAAcB//gAAAAAAEB/+AAAAAAAAD/8AAAAAAAAD/wAAAAAAAAH/gAAAAAAAAH+AAAAAAAAAP4AAAAAAAAAPgAAAAAAAAAeAAAAAAAAAA4AAAAAAAAAAgAAAA'),bits=new Uint8Array(W*H);
  for(var i=0;i<W*H;i++)bits[i]=(raw.charCodeAt(i>>3)>>(7-(i&7)))&1;
  var fill=[],edge=[];
  function on(x,y){return x>=0&&y>=0&&x<W&&y<H&&bits[y*W+x]===1}
  for(var y=0;y<H;y++)for(var x=0;x<W;x++){if(!bits[y*W+x])continue;fill.push([x,y]);if(!on(x-1,y)||!on(x+1,y)||!on(x,y-1)||!on(x,y+1))edge.push([x,y])}
  return GLYPH={w:W,h:H,fill:fill,edge:edge};
}
var SHAPES={
  world:{spin:'full',tilt:0.30,gen:function(r,i,N,o){
    for(;;){
      var u=r()*2-1,a=r()*TAU,s=Math.sqrt(1-u*u),x=s*Math.cos(a),y=u,z=s*Math.sin(a);
      var n=(noise3(x*1.8+3.1,y*1.8,z*1.8)+0.5*noise3(x*4.2,y*4.2+7,z*4.2))/1.5;
      var land=n>0.5;
      if(land||r()<0.3){o.x=x*0.94;o.y=y*0.94;o.z=z*0.94;o.w=land?1:0.4;return}
    }}},
  knot:{spin:'full',tilt:0.25,gen:function(r,i,N,o){
    var t=r()*TAU,k=2+Math.cos(3*t);
    o.x=0.3*k*Math.cos(2*t)+gz(r)*0.07;o.y=0.3*k*Math.sin(2*t)+gz(r)*0.07;o.z=0.3*Math.sin(3*t)*1.4+gz(r)*0.07;o.w=0.55+0.45*r()}},
  helix:{spin:'full',tilt:0.12,gen:function(r,i,N,o){
    var t=r(),an=t*TAU*3.4;
    o.x=Math.cos(an)*0.44+gz(r)*0.02;o.z=Math.sin(an)*0.44+gz(r)*0.02;o.y=(t-0.5)*1.7+(r()-0.5)*0.12;o.w=0.55+0.45*r()}},
  torus:{spin:'full',tilt:0.9,gen:function(r,i,N,o){
    var u=r()*TAU,v=r()*TAU,R=0.62,q=0.27;
    o.x=(R+q*Math.cos(v))*Math.cos(u);o.z=(R+q*Math.cos(v))*Math.sin(u);o.y=q*Math.sin(v);o.w=0.45+0.55*(0.5+0.5*Math.cos(v))}},
  flame:{spin:'swing',tilt:0.06,gen:function(r,i,N,o){
    var G=glyphData();
    var q=r(),pt=q<0.32?G.edge[(r()*G.edge.length)|0]:G.fill[(r()*G.fill.length)|0],sc=1.72/G.h;
    o.x=(pt[0]+r()-G.w/2)*sc;o.y=-(pt[1]+r()-G.h/2)*sc;o.z=(r()-0.5)*0.07;o.w=1}},
  blank:{spin:'full',tilt:0.3,gen:function(r,i,N,o){var u=r()*2-1,a=r()*TAU,q=Math.sqrt(1-u*u);o.x=q*Math.cos(a)*0.05;o.y=u*0.05;o.z=q*Math.sin(a)*0.05;o.w=0}},
  lattice:{spin:'full',tilt:0.5,gen:function(r,i,N,o){
    var c=[-0.6,-0.2,0.2,0.6];
    if(r()<0.55){o.x=c[(r()*4)|0]+gz(r)*0.04;o.y=c[(r()*4)|0]+gz(r)*0.04;o.z=c[(r()*4)|0]+gz(r)*0.04;o.w=1}
    else{var ax=(r()*3)|0,p=[c[(r()*4)|0],c[(r()*4)|0],c[(r()*4)|0]];p[ax]=-0.6+r()*1.2;o.x=p[0];o.y=p[1];o.z=p[2];o.w=0.5}}},
  card:{spin:'swing',tilt:0.12,gen:function(r,i,N,o){
    var x,y,w=0.25;
    if(r()<0.6){var p,q;do{p=r()*2-1;q=r()*2-1}while(Math.abs(p)+Math.abs(q)>=1);x=p*0.27;y=q*0.4;w=1}
    else{x=(r()-0.5)*1.05;y=(r()-0.5)*1.5;if(Math.abs(x)/0.27+Math.abs(y)/0.4<1)w=1;if(Math.abs(x)>0.485||Math.abs(y)>0.735)w=0.9}
    o.x=x;o.y=y;o.z=(r()-0.5)*0.04;o.w=w}},
  frames:{spin:'swing',tilt:0.1,gen:function(r,i,N,o){
    var f=(r()*3)|0,x,y,w;
    if(r()<0.6){var side=(r()*4)|0,t=r();
      if(side<2){x=(t-0.5)*1.1;y=side?0.33:-0.33}else{y=(t-0.5)*0.66;x=side==2?-0.55:0.55}w=1}
    else{x=(r()-0.5)*1.1;y=(r()-0.5)*0.66;w=0.22}
    o.x=x+(f-1)*0.14;o.y=y+(f-1)*0.1;o.z=(f-1)*0.36;o.w=w}},
  terrain:{spin:'full',tilt:0.78,gen:function(r,i,N,o){
    function H(x,y){return 0.14*Math.sin(3.1*x+0.7)*Math.cos(2.6*y)+0.05*Math.sin(7*x+3*y)}
    if(r()<0.32){var t=r()*TAU,x=0.62*Math.cos(t)+0.16*Math.cos(3*t),y=0.42*Math.sin(t)+0.12*Math.sin(2*t);
      o.x=x+gz(r)*0.012;o.z=y+gz(r)*0.012;o.y=H(x,y)+0.02;o.w=1}
    else{var x2=(r()*2-1)*0.95,y2=(r()*2-1)*0.7;o.x=x2;o.z=y2;o.y=H(x2,y2);o.w=0.3}}},
  funnel:{spin:'full',tilt:0.28,gen:function(r,i,N,o){
    var y=(r()*2-1)*0.85,k=(y+0.85)/1.7,a=r()*TAU;
    if(r()<0.1){var rr=r()*0.1;o.x=Math.cos(a)*rr;o.z=Math.sin(a)*rr;o.y=y;o.w=1;return}
    var rad=0.1+0.68*Math.pow(k,1.1)+gz(r)*0.015;
    o.x=Math.cos(a)*rad;o.z=Math.sin(a)*rad;o.y=y;o.w=0.35+0.65*(1-k)}},
  sheets:{spin:'swing',tilt:0.14,gen:function(r,i,N,o){
    var s=(r()*4)|0,th=(s-1.5)*0.2,x=(r()-0.5)*0.8,y=(r()-0.5)*1.05,z0=(s-1.5)*0.2;
    var line=(Math.floor((y+0.53)/0.085)%2===0)&&Math.abs(x)<0.32&&y<0.4;
    o.x=x*Math.cos(th)+z0*Math.sin(th);o.z=-x*Math.sin(th)+z0*Math.cos(th);o.y=y;o.w=line?1:0.26}},
  orb:{spin:'full',tilt:0.55,gen:function(r,i,N,o){
    var q=r();
    if(q<0.6){var u=r()*2-1,a=r()*TAU,s=Math.sqrt(1-u*u);o.x=s*Math.cos(a)*0.42;o.y=u*0.42;o.z=s*Math.sin(a)*0.42;o.w=0.4+0.6*noise3(u*3,a,3)}
    else if(q<0.86){var b=r()*TAU;o.x=Math.cos(b)*0.8+gz(r)*0.01;o.z=Math.sin(b)*0.8+gz(r)*0.01;o.y=gz(r)*0.01;o.w=0.8}
    else{var c=r()<0.5?0.8:3.9,u2=r()*2-1,a2=r()*TAU,s2=Math.sqrt(1-u2*u2);o.x=Math.cos(c)*0.8+s2*Math.cos(a2)*0.11;o.z=Math.sin(c)*0.8+s2*Math.sin(a2)*0.11;o.y=u2*0.11;o.w=1}}},
  waves:{spin:'full',tilt:0.62,gen:function(r,i,N,o){
    var x=(r()*2-1)*0.95,y=(r()*2-1)*0.8,f=0.5+0.5*Math.sin(17*y+2*x);
    o.x=x;o.z=y;o.y=0.13*Math.sin(5*y+2*x)+0.05*Math.sin(9*x);o.w=0.22+0.78*f*f*f}}
};
var shapeCache={};
function buildShape(key,N){
  var ck=key+':'+N;if(shapeCache[ck])return shapeCache[ck];
  var def=SHAPES[key],rng=mulberry32(1234+key.length*97+N),pos=new Float32Array(N*3),w=new Float32Array(N),o={x:0,y:0,z:0,w:1};
  for(var i=0;i<N;i++){def.gen(rng,i,N,o);pos[3*i]=o.x;pos[3*i+1]=o.y;pos[3*i+2]=o.z;w[i]=o.w}
  return shapeCache[ck]={pos:pos,w:w,spin:def.spin,tilt:def.tilt,amp:def.amp};
}

/* palette */
var ramp=[];
function parseHex(h){h=(h||'').trim();var m=/^#([0-9a-f]{6})$/i.exec(h);if(!m)return [90,90,150];var n=parseInt(m[1],16);return [n>>16&255,n>>8&255,n&255]}
function readPalette(){
  var cs=getComputedStyle(document.documentElement),lo=parseHex(cs.getPropertyValue('--st-lo')),hi=parseHex(cs.getPropertyValue('--st-hi'));
  ramp=[];
  for(var b=0;b<8;b++){var t=Math.pow((b+0.5)/8,0.8);ramp.push('rgb('+Math.round(lo[0]+(hi[0]-lo[0])*t)+','+Math.round(lo[1]+(hi[1]-lo[1])*t)+','+Math.round(lo[2]+(hi[2]-lo[2])*t)+')')}
}
readPalette();

var instances=[];
var paused=false;
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduce)paused=true;

function Stipple(canvas,opt){
  this.canvas=canvas;this.ctx=canvas.getContext('2d');this.cell=opt.cell||4;this.gain=opt.gain||0.9;this.fit=opt.fit||0.86;
  this.hero=!!opt.hero;this.auto=!!opt.auto;this.half=!!opt.half;this.phase=opt.phase||0;
  if(this.hero){this.shapes=opt.keys.map(function(k){return buildShape(k,opt.N)});this.scrP=new Float32Array(opt.N*3);this.scrW=new Float32Array(opt.N);this.dur=[12.6,6.8,6.8,6.8,6.8,6.8];this.total=this.dur.reduce(function(x,y){return x+y},0)}
  else this.shape=buildShape(opt.key,opt.N);
  this.visible=true;this.cols=0;this.rows=0;this.hx=0;this.hy=0;this.tx=0;this.ty=0;this.lastT=2;
  var self=this;
  this.ro=new ResizeObserver(function(){self.resize();self.render(self.lastT)});this.ro.observe(canvas);
  this.io=new IntersectionObserver(function(es){self.visible=es[es.length-1].isIntersecting});this.io.observe(canvas);
  var host=canvas.parentElement;
  this.onMove=function(e){var b=host.getBoundingClientRect();self.tx=((e.clientX-b.left)/b.width-0.5)*1.2;self.ty=((e.clientY-b.top)/b.height-0.5)*0.7};
  this.onLeave=function(){self.tx=0;self.ty=0};
  host.addEventListener('pointermove',this.onMove);host.addEventListener('pointerleave',this.onLeave);
  this.host=host;
  instances.push(this);this.resize();this.render(this.lastT);
}
Stipple.prototype.resize=function(){
  var c=this.canvas,w=c.clientWidth,h=c.clientHeight;
  if(!w||!h){this.cols=0;return}
  var dpr=Math.min(window.devicePixelRatio||1,2);
  c.width=Math.round(w*dpr);c.height=Math.round(h*dpr);this.ctx.setTransform(dpr,0,0,dpr,0,0);
  if(this.auto)this.cell=Math.max(3,Math.round(Math.min(w,h)/115));
  this.w=w;this.h=h;this.cols=Math.floor(w/this.cell);this.rows=Math.floor(h/this.cell);
  this.ox=(w-this.cols*this.cell)/2;this.oy=(h-this.rows*this.cell)/2;
  var n=this.cols*this.rows;this.buf=new Float32Array(n);this.lists=new Int32Array(n*8);this.counts=new Int32Array(8);
};
Stipple.prototype.destroy=function(){
  this.ro.disconnect();this.io.disconnect();this.host.removeEventListener('pointermove',this.onMove);this.host.removeEventListener('pointerleave',this.onLeave);
  var i=instances.indexOf(this);if(i>-1)instances.splice(i,1);
};
function ease(t){return t<0?0:t>1?1:t*t*(3-2*t)}
Stipple.prototype.render=function(t){
  if(!this.cols)return;
  this.lastT=t;
  this.hx+=(this.tx-this.hx)*0.08;this.hy+=(this.ty-this.hy)*0.08;
  var P,W,spin,tilt,op=0,sceneT=0;
  if(this.hero){
    var DUR=this.dur,n=this.shapes.length,tt=t%this.total,k=0,acc=0;
    while(k<n-1&&tt>=acc+DUR[k]){acc+=DUR[k];k++}
    var lt=tt-acc,hold=DUR[k]-1.8,a=this.shapes[k],b=this.shapes[(k+1)%n],mm=lt>hold?ease((lt-hold)/1.8):0;
    if(mm>0){var N=a.w.length,sp=this.scrP,sw=this.scrW,ap=a.pos,bp=b.pos,aw=a.w,bw=b.w;
      for(var j=0;j<N*3;j++)sp[j]=ap[j]+(bp[j]-ap[j])*mm;
      for(var j2=0;j2<N;j2++)sw[j2]=aw[j2]+(bw[j2]-aw[j2])*mm;
      P=sp;W=sw;tilt=a.tilt+(b.tilt-a.tilt)*mm}
    else{P=a.pos;W=a.w;tilt=a.tilt}
    if(k===0)op=1-mm;else if(k===n-1)op=mm;
    sceneT=k===0?lt:0;
    if(this.onScene)this.onScene(op);
    spin='full';
  }else{P=this.shape.pos;W=this.shape.w;spin=this.shape.spin;tilt=this.shape.tilt}
  var yaw=(spin==='swing'?Math.sin(t*0.55+this.phase)*(this.shape.amp||0.85):t*0.3+this.phase)+this.hx;
  var pitch=tilt+this.hy;
  var cyw=Math.cos(yaw),syw=Math.sin(yaw),cp=Math.cos(pitch),sp2=Math.sin(pitch);
  var cols=this.cols,rows=this.rows,cell=this.cell,buf=this.buf,gw=cols*cell,gh=rows*cell,R=Math.min(gw,gh)*0.5*this.fit,cx=gw/2,cy=gh/2,gain=this.gain,N2=W.length;
  buf.fill(0);
  if(this.hero&&op>0.004)this.addScene(sceneT,op);
  for(var i=0;i<N2;i++){
    var x=P[3*i],y=P[3*i+1],z=P[3*i+2];
    var x1=x*cyw+z*syw,z1=-x*syw+z*cyw,y2=y*cp-z1*sp2,z2=y*sp2+z1*cp;
    var f=1/(1-z2*0.12),sx=cx+x1*R*f,sy=cy-y2*R*f;
    if(sx<0||sy<0)continue;
    var c=(sx/cell)|0,r=(sy/cell)|0;
    if(c>=cols||r>=rows)continue;
    buf[r*cols+c]+=W[i]*(0.28+0.72*(z2*0.5+0.5))*gain;
  }
  var ctx=this.ctx,counts=this.counts,lists=this.lists,tot=cols*rows;
  ctx.clearRect(0,0,this.w,this.h);
  counts.fill(0);
  for(var q=0;q<tot;q++){var v=buf[q];if(v<0.07)continue;var bk=(v*8)|0;if(bk>7)bk=7;lists[bk*tot+counts[bk]++]=q}
  var dw=Math.max(1.4,cell*0.48),dh=cell*0.88,dx=(cell-dw)/2,dy=(cell-dh)/2;
  for(var bb=0;bb<8;bb++){
    var cnt=counts[bb];if(!cnt)continue;
    ctx.fillStyle=ramp[bb];ctx.beginPath();
    for(var kk=0;kk<cnt;kk++){var idx=lists[bb*tot+kk],cc=idx%cols,rr=(idx/cols)|0;ctx.rect(this.ox+cc*cell+dx,this.oy+rr*cell+dy,dw,dh)}
    ctx.fill();
  }
};


/* ---------------- overhead-press scene, drawn into the dot grid ---------------- */
var BAYER=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(function(v){return (v+0.5)/16});
function sstep(x){return x<0?0:x>1?1:x*x*(3-2*x)}
var REP=3.6;
function pressPose(t){
  var p=((t%REP)+REP)%REP,h,q;
  if(p<0.5)h=0;
  else if(p<1.4){q=(p-0.5)/0.9;h=0.6*sstep(q)+0.4*(1-Math.pow(1-q,2))}
  else if(p<2.1)h=1;
  else if(p<3.0)h=1-sstep((p-2.1)/0.9);
  else h=0;
  var s;
  if(p<0.5)s=sstep(p/0.5);
  else if(p<0.8)s=1-sstep((p-0.5)/0.3);
  else if(p<2.8)s=0;
  else if(p<3.2)s=0.5*sstep((p-2.8)/0.4);
  else s=0.5*(1-sstep((p-3.2)/0.4));
  var tr=(p>1.4&&p<1.9)?(1-(p-1.4)/0.5)*1.6*Math.sin(p*38):0;
  return {h:h,s:s,tr:tr};
}
function arm(S,H,L,out){
  var dx=H[0]-S[0],dy=H[1]-S[1],d=Math.sqrt(dx*dx+dy*dy);
  if(d>2*L-1){var k=(2*L-1)/d;H=[S[0]+dx*k,S[1]+dy*k];dx=H[0]-S[0];dy=H[1]-S[1];d=2*L-1}
  var a=d/2,hh=Math.sqrt(Math.max(0,L*L-a*a)),ux=dx/d,uy=dy/d,nx=-uy,ny=ux;
  var e1=[S[0]+ux*a+nx*hh,S[1]+uy*a+ny*hh],e2=[S[0]+ux*a-nx*hh,S[1]+uy*a-ny*hh];
  var e=(out<0?(e1[0]<e2[0]?e1:e2):(e1[0]>e2[0]?e1:e2));
  return {e:e,h:H};
}
function gray(v){var c=Math.round(v*255);return 'rgb('+c+','+c+','+c+')'}
function drawPizza(ctx){
  // a six-slice pizza with two slices already eaten; the four left are pulled slightly apart so the cuts read
  var R=50,D=Math.PI/180;
  for(var i=0;i<4;i++){
    var a0=(40+60*i)*D,a1=(100+60*i)*D,bis=(70+60*i)*D,ox=4*Math.cos(bis),oy=4*Math.sin(bis);
    ctx.save();ctx.translate(ox,oy);
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(R*Math.cos(a0),R*Math.sin(a0));ctx.arc(0,0,R,a0,a1,false);ctx.closePath();
    ctx.fillStyle=gray(0.36);ctx.fill();
    ctx.strokeStyle=gray(0.85);ctx.lineWidth=6.5;ctx.beginPath();ctx.arc(0,0,R-3.2,a0,a1,false);ctx.stroke();
    var px=27*Math.cos(bis),py=27*Math.sin(bis);
    ctx.beginPath();ctx.arc(px,py,8,0,TAU);ctx.strokeStyle='#000';ctx.lineWidth=3;ctx.stroke();ctx.fillStyle=gray(1);ctx.fill();
    ctx.restore();
  }
}
var TERM=[[0,[14,6,22]],[8,[10,18,8,12]],[8,[20,10,14]],[0,[8,24,12]]],TERM_TONE=[1,0.6,0.85,1,0.7];
function drawTerminal(ctx,t){
  ctx.beginPath();ctx.roundRect?ctx.roundRect(-54,-38,108,76,6):ctx.rect(-54,-38,108,76);
  ctx.strokeStyle=gray(1);ctx.lineWidth=4;ctx.stroke();
  ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-54,-23);ctx.lineTo(54,-23);ctx.stroke();
  ctx.fillStyle=gray(1);[-42,-33,-24].forEach(function(x){ctx.beginPath();ctx.arc(x,-30.5,2.6,0,TAU);ctx.fill()});
  var ct=t%6.6,clear=ct>5.7,pos=clear?0:ct*40,curX=-38,curY=-9;
  ctx.lineCap='butt';
  for(var li=0;li<4&&pos>0;li++){
    var y=-9+li*14,x=-38+TERM[li][0],segs=TERM[li][1];
    ctx.strokeStyle=gray(1);ctx.lineWidth=3.6;ctx.beginPath();ctx.moveTo(-48,y-4.5);ctx.lineTo(-43,y);ctx.lineTo(-48,y+4.5);ctx.stroke();
    curX=x;curY=y;
    for(var si=0;si<segs.length&&pos>0;si++){
      var seg=segs[si],len=Math.min(seg,pos);
      ctx.strokeStyle=gray(TERM_TONE[(li+si)%5]);ctx.lineWidth=6.5;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+len,y);ctx.stroke();
      x+=len;pos-=len;curX=x;
      if(len<seg)break;
      var adv=Math.min(5,pos);x+=adv;pos-=adv;curX=x;
    }
  }
  if(Math.floor(t*2.5)%2===0){ctx.fillStyle=gray(1);ctx.fillRect(curX+2,curY-6,7,12)}
  ctx.lineCap='round';
}
function drawPress(ctx,cols,rows,t){
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#000';ctx.fillRect(0,0,cols,rows);
  var sc=Math.min(cols/360,rows/390)*0.96;
  ctx.setTransform(sc,0,0,sc,cols/2-310*sc,rows/2-265*sc);
  ctx.lineCap='round';ctx.lineJoin='round';
  var po=pressPose(t),GY=448,R=28,cy=GY-30-R+po.s*9,hy=358-po.h*64+po.s*4+po.tr;
  // ground
  ctx.strokeStyle=gray(0.8);ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(208,GY+3);ctx.quadraticCurveTo(320,GY+0,432,GY+3);ctx.stroke();
  // legs
  ctx.strokeStyle=gray(1);ctx.lineWidth=5.5;
  [-1,1].forEach(function(sd){
    var hip=[320+sd*10,cy+R-6],ft=[320+sd*18,GY],kn=[(hip[0]+ft[0])/2+sd*po.s*8,(hip[1]+ft[1])/2];
    ctx.beginPath();ctx.moveTo(hip[0],hip[1]);ctx.lineTo(kn[0],kn[1]);ctx.lineTo(ft[0],ft[1]);ctx.lineTo(ft[0]+sd*7,ft[1]);ctx.stroke();
  });
  // heap: two shapes rest on the slab, the rest float above it with clear gaps and lag the lift slightly
  var vel=(po.h-pressPose(t-0.06).h)/0.06;
  function fl(k,ph,amp){return vel*k+(amp||3)*Math.sin(t*1.3+ph)}
  ctx.save();
  ctx.translate(320,hy-9);
  ctx.rotate(0.01*Math.sin(t*1.3)+po.tr*0.004);
  function halo(w){ctx.strokeStyle='#000';ctx.lineWidth=w;ctx.stroke()}
  // resting: half disc + triangle
  var hdx=44,hdy=-32+fl(3,0.5,1.5);
  ctx.save();ctx.translate(hdx,hdy);ctx.rotate(2*Math.sin(t*1.7)*Math.PI/180);ctx.translate(-hdx,-hdy);
  ctx.beginPath();ctx.moveTo(hdx-30,hdy);ctx.arc(hdx,hdy,30,Math.PI,2*Math.PI);ctx.closePath();ctx.fillStyle=gray(0.68);ctx.fill();
  ctx.restore();
  ctx.save();ctx.translate(-30,-51+fl(3,1.5,1.5));var hb=1.05*(1+0.06*Math.pow(Math.max(0,Math.sin(t*3)),3));ctx.scale(hb,hb);ctx.rotate(50*Math.PI/180);ctx.translate(0,23);
  ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(-30,-20,-30,-42,-14,-46);ctx.bezierCurveTo(-6,-48,0,-42,0,-36);ctx.bezierCurveTo(0,-42,6,-48,14,-46);ctx.bezierCurveTo(30,-42,30,-20,0,0);ctx.closePath();
  ctx.strokeStyle=gray(1);ctx.lineWidth=4.5/hb;ctx.stroke();ctx.restore();
  // floating half-eaten pepperoni pizza
  ctx.save();ctx.translate(-106,-94+fl(6,0.2));ctx.rotate((52+4*Math.sin(t*1.2))*Math.PI/180);
  ctx.scale(1.12,1.12);drawPizza(ctx);
  ctx.restore();
  // floating terminal with code typing itself in
  ctx.save();ctx.translate(98,-122+fl(8,1.1));ctx.rotate((5+3*Math.sin(t*1.4))*Math.PI/180);
  drawTerminal(ctx,t);
  ctx.restore();
  // floating outline triangle, ring and dot
  ctx.save();ctx.translate(-38,-168+fl(7,2.0));ctx.rotate(t*0.45);
  ctx.strokeStyle=gray(1);ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-22,18);ctx.lineTo(0,-26);ctx.lineTo(20,20);ctx.closePath();ctx.stroke();
  ctx.restore();
    ctx.beginPath();ctx.arc(0,-104+fl(5,4.0),8,0,TAU);ctx.fillStyle=gray(0.9);ctx.fill();
  // slab
  ctx.beginPath();ctx.roundRect?ctx.roundRect(-66,-16,132,16,8):ctx.rect(-66,-16,132,16);halo(6);ctx.fillStyle=gray(1);ctx.fill();
  ctx.restore();
  // arms + hands (hands sit under the slab)
  var SL=[298,cy-6],SR=[342,cy-6],HL=[286,hy],HR=[354,hy];
  var aL=arm(SL,HL,46,-1),aR=arm(SR,HR,46,1);
  ctx.strokeStyle=gray(1);ctx.lineWidth=5.5;
  [[SL,aL],[SR,aR]].forEach(function(z){ctx.beginPath();ctx.moveTo(z[0][0],z[0][1]);ctx.lineTo(z[1].e[0],z[1].e[1]);ctx.lineTo(z[1].h[0],z[1].h[1]);ctx.stroke()});
  [aL.h,aR.h].forEach(function(h){ctx.beginPath();ctx.arc(h[0],h[1],9,0,TAU);halo(4);ctx.fillStyle=gray(1);ctx.fill()});
  // body + face
  ctx.beginPath();ctx.arc(320,cy,R,0,TAU);ctx.fillStyle=gray(0.5);ctx.fill();ctx.strokeStyle=gray(1);ctx.lineWidth=4.5;ctx.stroke();
  ctx.fillStyle='#000';ctx.strokeStyle='#000';ctx.lineWidth=3.2;
  var blink=(t%4.4)/4.4>0.94;
  [-10,10].forEach(function(dx){ctx.beginPath();if(blink){ctx.moveTo(320+dx-3.5,cy-3);ctx.lineTo(320+dx+3.5,cy-3);ctx.stroke()}else{ctx.arc(320+dx,cy-4,3.6,0,TAU);ctx.fill()}});
  ctx.beginPath();ctx.moveTo(311,cy+12);ctx.quadraticCurveTo(320,cy+4,329,cy+12);ctx.stroke();
}
Stipple.prototype.addScene=function(t,op){
  var cols=this.cols,rows=this.rows;
  if(!this.sc||this.sc.width!==cols||this.sc.height!==rows){this.sc=document.createElement('canvas');this.sc.width=cols;this.sc.height=rows;this.sctx=this.sc.getContext('2d',{willReadFrequently:true})}
  drawPress(this.sctx,cols,rows,t);
  var d=this.sctx.getImageData(0,0,cols,rows).data,buf=this.buf;
  for(var r=0;r<rows;r++){for(var c=0;c<cols;c++){
    var i=r*cols+c,v=d[4*i]/255*op;if(v<0.06)continue;
    if(v>BAYER[(r&3)*4+(c&3)]){var vv=0.42+0.58*v;if(vv>buf[i])buf[i]=vv}
  }}
};

var frame=0;
function loop(ts){
  requestAnimationFrame(loop);
  if(paused)return;
  frame++;
  var t=ts/1000;
  for(var i=0;i<instances.length;i++){var s=instances[i];if(!s.visible)continue;if(s.half&&(frame&1))continue;s.render(t)}
}
function renderAll(){for(var i=0;i<instances.length;i++)instances[i].render(instances[i].lastT)}
requestAnimationFrame(loop);

/* theme changes */
new MutationObserver(function(){readPalette();renderAll()}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
if(window.matchMedia){var mq=window.matchMedia('(prefers-color-scheme: dark)');var onMq=function(){readPalette();renderAll()};mq.addEventListener?mq.addEventListener('change',onMq):mq.addListener(onMq)}

/* ---------------- hero ---------------- */
var hero=new Stipple($('#heroCanvas'),{hero:true,keys:['blank','world','knot','helix','torus','lattice'],N:9000,cell:5,auto:true,gain:0.5,fit:0.84});

var note=$('.art-note'),stageArt=$('#stageArt');
hero.onScene=function(op){note.style.opacity=(1-op).toFixed(3)};
hero.render(hero.lastT);

/* motion switch */
var sw=$('#motionSwitch');
function setPaused(v){paused=v;stageArt.classList.toggle('is-paused',v);sw.setAttribute('aria-checked',String(v));renderAll()}
sw.setAttribute('aria-checked',String(paused));stageArt.classList.toggle('is-paused',paused);
sw.addEventListener('click',function(){setPaused(!paused)});

/* clock */
(function(){
  var el=$('#clock'),fmt;
  try{fmt=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Kolkata'})}catch(e){fmt=null}
  function tick(){el.textContent=fmt?('Navi Mumbai · '+fmt.format(new Date())+' IST'):'Navi Mumbai'}
  tick();setInterval(tick,20000);
})();

/* ---------------- work: tabs + cards ---------------- */
var tabsEl=$('#tabs'),panelsEl=$('#panels');
var cardInstances=[];
TABS.forEach(function(t){
  var items=PROJECTS.filter(function(p){return p.tab===t.id});
  var b=document.createElement('button');
  b.className='tab';b.type='button';b.id='tab-'+t.id;b.setAttribute('role','tab');b.setAttribute('aria-controls','panel-'+t.id);b.dataset.tab=t.id;
  b.innerHTML=esc(t.label)+'<span class="n">'+items.length+'</span>';
  tabsEl.appendChild(b);
  var p=document.createElement('div');
  p.id='panel-'+t.id;p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby','tab-'+t.id);
  p.innerHTML=items.map(cardHTML).join('');
  panelsEl.appendChild(p);
});
function cardHTML(p){
  return '<article class="card" id="card-'+p.slug+'" data-slug="'+p.slug+'">'+
   '<div class="card-art"><canvas aria-hidden="true" data-shape="'+p.shape+'" data-n="'+(p.n||3600)+'"></canvas>'+
     '<button class="btn btn-ghost copy" type="button" data-copy="'+p.slug+'">'+ICON_COPY+'Copy link</button></div>'+
   '<div class="card-main"><p class="k">'+esc(p.kicker)+'</p><h3>'+ttl(p.title)+'</h3><p class="tags">'+p.tags.map(esc).join(' · ')+'</p></div>'+
   '<div class="card-side"><p class="txt" aria-live="polite">'+esc(p.brief)+'</p>'+
     '<div class="ctrl"><div class="seg" role="group" aria-label="Project details">'+
       '<button type="button" aria-pressed="true" data-seg="brief">Brief</button>'+
       '<button type="button" aria-pressed="false" data-seg="role">Role</button>'+
       '<button type="button" aria-pressed="false" data-seg="status">'+esc(p.statusLabel)+'</button></div>'+
     '<button class="btn btn-solid" type="button" data-expand="'+p.slug+'">'+ICON_EXPAND+'Expand</button></div></div>'+
  '</article>';
}
$$('.card canvas').forEach(function(cv,i){
  cardInstances.push(new Stipple(cv,{key:cv.dataset.shape,N:+cv.dataset.n||3600,cell:4,gain:0.55,fit:0.66,half:true,phase:i*0.9}));
});

function setTab(id,focus){
  $$('.tab').forEach(function(b){var on=b.dataset.tab===id;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;if(on&&focus)b.focus()});
  TABS.forEach(function(t){$('#panel-'+t.id).hidden=t.id!==id});
  try{localStorage.setItem('mp-tab',id)}catch(e){}
}
var startTab='now';
try{var st=localStorage.getItem('mp-tab');if(st&&TABS.some(function(t){return t.id===st}))startTab=st}catch(e){}
setTab(startTab);
tabsEl.addEventListener('keydown',function(e){
  var ids=TABS.map(function(t){return t.id}),cur=ids.indexOf(document.activeElement.dataset&&document.activeElement.dataset.tab);
  if(cur<0)return;
  var nx=e.key==='ArrowRight'?(cur+1)%ids.length:e.key==='ArrowLeft'?(cur+ids.length-1)%ids.length:e.key==='Home'?0:e.key==='End'?ids.length-1:-1;
  if(nx<0)return;e.preventDefault();setTab(ids[nx],true);
});

/* ---------------- toast + copy ---------------- */
var toast=$('#toast'),toastT;
function showToast(msg){toast.textContent=msg;toast.hidden=false;clearTimeout(toastT);toastT=setTimeout(function(){toast.hidden=true},2200)}
function copyText(text,okMsg){
  function fallback(){
    try{var ta=document.createElement('textarea');ta.value=text;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;left:-9999px;top:0';document.body.appendChild(ta);ta.select();var ok=document.execCommand('copy');document.body.removeChild(ta);showToast(ok?okMsg:'Select and copy: '+text)}
    catch(e){showToast('Select and copy: '+text)}
  }
  try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(function(){showToast(okMsg)},fallback)}else fallback()}catch(e){fallback()}
}
function linkFor(slug){return location.href.split('#')[0]+'#'+slug}

/* ---------------- dialog ---------------- */
var dlg=$('#dlg'),dlgInstance=null,dlgSlug=null;
function openDialog(slug){
  var p=PROJECTS.filter(function(x){return x.slug===slug})[0];if(!p)return;
  dlgSlug=slug;
  dlg.innerHTML='<div class="dlg-body"><div class="dlg-art"><canvas aria-hidden="true"></canvas></div>'+
   '<div class="dlg-r"><div class="dlg-top"><p class="k">'+esc(p.kicker)+'</p><button class="btn btn-ghost" type="button" data-close>Close</button></div>'+
   '<h3 id="dlgTitle">'+ttl(p.title)+'</h3><p class="brief">'+esc(p.brief)+'</p>'+
   '<dl class="facts"><div><dt>Role</dt><dd>'+esc(p.role)+'</dd></div><div><dt>'+esc(p.statusLabel)+'</dt><dd>'+esc(p.status)+'</dd></div><div><dt>'+esc(p.tagsLabel)+'</dt><dd>'+p.tags.map(esc).join(', ')+'</dd></div></dl>'+
   '<div class="dlg-actions"><button class="btn btn-ghost" type="button" data-copy="'+p.slug+'">'+ICON_COPY+'Copy link</button></div></div></div>';
  if(!dlg.open)dlg.showModal();
  var cv=$('canvas',dlg);
  if(dlgInstance)dlgInstance.destroy();
  dlgInstance=new Stipple(cv,{key:p.shape,N:p.nd||4600,cell:5,gain:0.55,fit:0.8,phase:0.6});
  try{history.replaceState(null,'','#'+slug)}catch(e){}
}
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
dlg.addEventListener('close',function(){
  if(dlgInstance){dlgInstance.destroy();dlgInstance=null}
  var was=dlgSlug;dlgSlug=null;
  try{if(location.hash==='#'+was)history.replaceState(null,'',location.href.split('#')[0])}catch(e){}
});

/* ---------------- delegated clicks ---------------- */
document.addEventListener('click',function(e){
  var t=e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.dataset.tab){setTab(t.dataset.tab);return}
  if(t.dataset.expand){openDialog(t.dataset.expand);return}
  if(t.hasAttribute('data-close')){dlg.close();return}
  if(t.dataset.copy){copyText(linkFor(t.dataset.copy),'Link copied');return}
  if(t.dataset.copytext){copyText(t.dataset.copytext,t.dataset.msg||'Copied');return}
  if(t.dataset.seg){
    var card=t.closest('.card'),p=PROJECTS.filter(function(x){return x.slug===card.dataset.slug})[0];
    $$('.seg button',card).forEach(function(b){b.setAttribute('aria-pressed',String(b===t))});
    $('.txt',card).textContent=p[t.dataset.seg];
  }
});

/* ---------------- hash routing for project links ---------------- */
function fromHash(){
  var h=decodeURIComponent((location.hash||'').slice(1)),p=PROJECTS.filter(function(x){return x.slug===h})[0];
  if(!p)return;
  setTab(p.tab);
  requestAnimationFrame(function(){openDialog(p.slug)});
}
window.addEventListener('hashchange',fromHash);
fromHash();
})();
