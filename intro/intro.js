/* Intro de carga AUTOMATA. Ponla en el <head>, sin defer. */
(function(){
const ONCE=true; /* true = solo una vez por sesión; false = en cada visita */
const FORCE=new URLSearchParams(location.search).get('intro')==='1'; /* ?intro=1 permite volver a probarla */
try{if(ONCE&&!FORCE&&sessionStorage.getItem('ai-seen'))return;if(ONCE&&!FORCE)sessionStorage.setItem('ai-seen','1')}catch(e){}
const base=document.currentScript?new URL('.',document.currentScript.src).href:'';
const de=document.documentElement,prevOv=de.style.overflow;de.dataset.introPending='true';de.style.overflow='hidden';
const ai=document.createElement('div');ai.id='ai';
ai.style.setProperty('--logo','url("'+base+'logo-blanco.webp")');
ai.style.setProperty('--logoc','url("'+base+'logo-color.webp")');
ai.innerHTML='<div class="glass"></div><div class="aura"></div><div class="stage" role="img" aria-label="Automata"></div>';
de.appendChild(ai);
const loaded=new Promise(r=>document.readyState==='complete'?r():addEventListener('load',r));
let ended=false;
function end(){if(ended)return;ended=true;de.style.overflow=prevOv;setTimeout(()=>{ai.remove();requestAnimationFrame(()=>{de.dataset.introDone='true';delete de.dataset.introPending;document.dispatchEvent(new CustomEvent('intro:done'))})},60)}
setTimeout(end,20000); /* seguro: nunca bloquea la web más de 20 s */

const E=[0,182,355,525,700],R=[0,172,343],W=700,H=343;
const S=[
'<path d="M12 3C7.5 3 5 6 5 9.5c0 2.3 1 3.6 2.5 4.6V18h9v-3.9c1.5-1 2.5-2.3 2.5-4.6C19 6 16.5 3 12 3Z"/><circle cx="9.3" cy="10.3" r="1.7"/><circle cx="14.7" cy="10.3" r="1.7"/><path d="M10 18v2.5M12 18v2.5M14 18v2.5M12 12.8l-.8 1.6h1.6Z"/>',
'<path d="M2 12C6 5 18 5 22 12 18 19 6 19 2 12Z"/><circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r=".6"/>',
'<ellipse cx="12" cy="14" rx="10" ry="3.5"/><path d="M7 12.5C7 8 9 6 12 6s5 2 5 6.5M8.5 17.2 6.5 21M12 17.5V21M15.5 17.2l2 3.8"/>',
'<path d="M12 3c5 0 8 3.5 8 7.5 0 4.5-4 9.5-8 10.5-4-1-8-6-8-10.5C4 6.5 7 3 12 3Z"/><path d="M6.5 10c2 0 4 1.5 4.5 3-2.5.2-4.5-1-4.5-3ZM17.5 10c-2 0-4 1.5-4.5 3 2.5.2 4.5-1 4.5-3Z"/>',
'<rect x="5" y="7" width="14" height="12" rx="2"/><path d="M12 7V3.5M10 3.5h4M2.5 12v3M21.5 12v3M9 16h6"/><circle cx="9.5" cy="12" r="1.5"/><circle cx="14.5" cy="12" r="1.5"/>',
'<path d="M12 20S3.5 14.5 3.5 9A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.5 2C20.5 14.5 12 20 12 20Z"/>',
'<circle cx="12" cy="12" r="5"/><ellipse cx="12" cy="12" rx="10.5" ry="3.2" transform="rotate(-20 12 12)"/>',
'<path d="M12 2c.8 5.2 4.8 9.2 10 10-5.2.8-9.2 4.8-10 10-.8-5.2-4.8-9.2-10-10 5.2-.8 9.2-4.8 10-10Z"/>',
'<circle cx="12" cy="13" r="3.2"/><path d="M9.5 11 4 6M9 14l-6 2M14.5 11l5.5-5M15 14l6 2M10.5 10 8.5 4M13.5 10l2-6M10 16l-3 5M14 16l3 5"/>',
'<path d="M13 2 5 13h6l-1 9 8-12h-6Z"/>',
'<path d="M12 2C9 7 6 9.500 6 14a6 6 0 0 0 12 0c0-2-1-3.500-2-4.500-.5 2-1.500 3-2.500 3C14 9 13 5 12 2Z"/>'];
const C=['#4459ff','#2adadc','#76f50e','#f8aa1a','#f926f5','#6503f2','#00ffda','#fff'];
const stage=ai.querySelector('.stage'),mq=matchMedia('(prefers-reduced-motion: reduce)');
const rnd=a=>a[Math.random()*a.length|0];
let run=0;
const crop=(x,y,w,h)=>`var(--logo) ${x/(W-w)*100}% ${y/(H-h)*100}%/${W/w*100}% ${H/h*100}% no-repeat`;
const box=(el,x,y,w,h)=>{el.style.cssText+=`;left:${x/W*100}%;top:${y/H*100}%;width:${w/W*100}%;height:${h/H*100}%`};
function build(){
  stage.innerHTML='';stage.classList.remove('win','flash');
  const reels=[],prizes=[];
  for(let c=0;c<4;c++){
    const x=E[c],w=E[c+1]-x,h=R[1],n=13+c*2,m=n+1;
    const el=document.createElement('div');el.className='reel';box(el,x,0,w,h);
    const st=document.createElement('div');st.className='strip';st.style.height=m*100+'%';
    let html='',last='';
    for(let k=0;k<m;k++){
      if(k===n-1){html+=`<div class="it" style="height:${100/m}%;background:${crop(x,0,w,h)}"></div>`;continue}
      let s;do{s=rnd(S)}while(s===last);last=s;
      html+=`<div class="it" style="height:${100/m}%;color:${rnd(C)}"><svg viewBox="0 0 24 24">${s}</svg></div>`;
    }
    st.innerHTML=html;el.append(st);stage.append(el);reels.push({el,st,n,m});
  }
  for(let c=0;c<4;c++){
    const x=E[c],y=R[1],w=E[c+1]-x,h=R[2]-y;
    const el=document.createElement('div');el.className='prize';box(el,x,y,w,h);
    el.style.background=crop(x,y,w,h);stage.append(el);prizes.push(el);
  }
  const col=document.createElement('div');col.className='color';stage.append(col);
  return {reels,prizes};
}
function spin(r,i,idx,done){
  const T=2600+i*600,t0=performance.now()+250;
  (function tick(now){
    if(idx!==run)return;
    if(now<t0){requestAnimationFrame(tick);return}
    const k=Math.min((now-t0)/T,1);
    let pos=(1-Math.pow(1-k,3))*(r.n-1);
    if(k>=1){const s=(now-t0-T)/380;if(s<1)pos+=.1*Math.sin(Math.PI*s)*(1-s)*2}
    r.st.style.transform=`translate3d(0,${-pos/r.m*100}%,0)`;
    if(k>=1&&now-t0-T>380){r.st.style.transform=`translate3d(0,${-(r.n-1)/r.m*100}%,0)`;r.el.classList.add('land');done();return}
    requestAnimationFrame(tick);
  })(performance.now());
}
function reveal(idx,prizes){
  stage.classList.add('win');
  prizes.forEach((el,i)=>{
    el.animate([{opacity:0,transform:'translate3d(0,-70%,0)'},{opacity:1,transform:'translate3d(0,6%,0)',offset:.65},{opacity:1,transform:'translate3d(0,0,0)'}],
      {duration:700,delay:450+i*150,easing:'cubic-bezier(.3,.7,.3,1)',fill:'forwards'}).onfinish=()=>{el.style.opacity=1;el.style.animation='glow .9s ease-out'};
  });
  setTimeout(()=>{if(idx!==run)return;ai.classList.add('formed');stage.classList.add('flash');setTimeout(()=>{loaded.then(()=>{if(idx!==run)return;ai.classList.add('out');setTimeout(end,1500)})},1900)},450+3*150+700);
}
function play(){
  const idx=++run;ai.classList.remove('out','gone','formed');ai.classList.add('on');
  const {reels,prizes}=build();
  if(mq.matches){reels.forEach(({el,st,n,m})=>{st.style.transform=`translate3d(0,${-(n-1)/m*100}%,0)`;el.classList.add('land')});prizes.forEach(p=>p.style.opacity=1);setTimeout(()=>{if(idx!==run)return;ai.classList.add('out','gone');end()},900);return}
  let landed=0;
  reels.forEach((r,i)=>spin(r,i,idx,()=>{if(++landed===4)setTimeout(()=>{if(idx===run)reveal(idx,prizes)},250)}));
}
requestAnimationFrame(play);

})();
