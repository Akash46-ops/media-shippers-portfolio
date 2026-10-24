const V=f=>'assets/video/'+f+'.mp4',I=f=>'assets/img/'+f+'.jpg';
const vid=(f,cls='')=>`<video class="${cls}" src="${V(f)}" poster="${I(f)}" controls playsinline preload="none"></video>`;
// Language tabs
const langs=[...new Set(SAMPLES.map(s=>s.lang))];
const tabs=document.getElementById('tabs'),grid=document.getElementById('grid');
const count=l=>SAMPLES.filter(s=>l==='All'||s.lang===l||(l==='Animation'&&s.anim)).length;
['All',...langs,'Animation'].forEach((l,i)=>{const b=document.createElement('button');b.className='tab'+(i?'':' on');b.innerHTML=`${l} <span>${count(l)}</span>`;b.onclick=()=>{document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));b.classList.add('on');render(l)};tabs.appendChild(b)});
function render(l){grid.innerHTML='';
 SAMPLES.filter(s=>l==='All'||s.lang===l||(l==='Animation'&&s.anim)).forEach(s=>{
  const c=document.createElement('article');c.className='scard'+(s.v?' vert':'')+(s.orig?' paired':'');
  c.innerHTML=(s.orig?`<div class="pairwrap"><figure><figcaption>Original</figcaption>${vid(s.orig)}</figure><figure><figcaption class="d">${s.lang} dub</figcaption>${vid(s.f)}</figure></div>`:`<div class="media"><span class="badge">${s.lang} dub</span>${vid(s.f)}</div>`)+
  `<div class="info"><div class="pair">${s.lang}${s.note?' · '+s.note:''}</div><h3>${s.title}</h3></div>`;
  grid.appendChild(c)});
 hookVideos();}
render('All');
// Showreels
document.getElementById('reels').innerHTML=REELS.map(r=>`<article class="scard vert reel"><div class="media"><span class="badge">Showreel</span>${vid(r.f)}</div><div class="info"><h3>${r.title}</h3></div></article>`).join('');
// Only one video plays at a time
function hookVideos(){document.querySelectorAll('video[controls]').forEach(v=>{if(v._h)return;v._h=1;v.addEventListener('play',()=>document.querySelectorAll('video[controls]').forEach(o=>{if(o!==v)o.pause()}))})}
hookVideos();
// Nav highlight + reveal
const links=[...document.querySelectorAll('.nav a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id))}),{threshold:.3});
document.querySelectorAll('section[id]').forEach(s=>io.observe(s));
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
