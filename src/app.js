const dialog=document.querySelector('.lightbox');
const openers=[...document.querySelectorAll('.image-open')];
const stage=dialog.querySelector('.lightbox-stage');
const image=stage.querySelector('img');
const control=name=>dialog.querySelector(`[data-action="${name}"]`);
let group=[],index=0,zoom=1,opener,oldOverflow,oldGutter,scrollPosition,locked=false;
function restorePage(){
 if(!locked)return;locked=false;
 document.documentElement.style.overflow=oldOverflow;document.documentElement.style.scrollbarGutter=oldGutter;
 opener?.focus({preventScroll:true});window.scrollTo(0,scrollPosition);
}
function closeViewer(){dialog.close();restorePage();}
function fit(){
 if(!image.naturalWidth||!dialog.open)return;
 const width=Math.min(stage.clientWidth-24,(stage.clientHeight-24)*image.naturalWidth/image.naturalHeight,image.naturalWidth);
 image.style.width=`${width*zoom}px`;
 control('zoom-out').disabled=zoom<=1;control('zoom-in').disabled=zoom>=4;
}
function show(){
 const source=group[index];zoom=1;image.src=source.querySelector('img').src;image.alt=source.querySelector('img').alt;
 dialog.querySelector('.lightbox-caption').textContent=source.closest('figure').querySelector('figcaption')?.textContent||image.alt;
 dialog.querySelector('.image-count').textContent=`${index+1} / ${group.length}`;
 control('previous').hidden=control('next').hidden=group.length<2;stage.scrollTo(0,0);fit();
}
function move(delta){index=(index+delta+group.length)%group.length;show();}
function changeZoom(delta){zoom=Math.max(1,Math.min(4,zoom+delta));fit();}
for(const button of openers){
 button.type='button';button.setAttribute('aria-haspopup','dialog');button.title='Click to enlarge';
 button.addEventListener('click',()=>{
  opener=button;group=openers.filter(x=>x.dataset.gallery===button.dataset.gallery);index=group.indexOf(button);
  oldOverflow=document.documentElement.style.overflow;oldGutter=document.documentElement.style.scrollbarGutter;scrollPosition=window.scrollY;
  locked=true;document.documentElement.style.scrollbarGutter='stable';document.documentElement.style.overflow='hidden';dialog.showModal();show();control('close').focus();
 });
}
image.addEventListener('load',fit);
dialog.addEventListener('click',event=>{
 const action=event.target.closest('[data-action]')?.dataset.action;
 if(action==='close'||event.target===dialog||event.target===stage)closeViewer();
 if(action==='previous')move(-1);if(action==='next')move(1);
 if(action==='zoom-in')changeZoom(.5);if(action==='zoom-out')changeZoom(-.5);
});
dialog.addEventListener('keydown',event=>{
 if(event.key==='ArrowLeft'&&zoom===1&&group.length>1){event.preventDefault();move(-1);}
 if(event.key==='ArrowRight'&&zoom===1&&group.length>1){event.preventDefault();move(1);}
 if(event.key==='+'){event.preventDefault();changeZoom(.5);}if(event.key==='-'){event.preventDefault();changeZoom(-.5);}
 if(event.key==='Tab'){
  const stops=[...dialog.querySelectorAll('button:not([hidden]):not(:disabled),[tabindex="0"]')],first=stops[0],last=stops.at(-1);
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 }
});
dialog.addEventListener('cancel',event=>{event.preventDefault();closeViewer();});
dialog.addEventListener('close',()=>{if(!dialog.open)restorePage();});
window.addEventListener('resize',fit);
const links=[...document.querySelectorAll('nav a')];
if('IntersectionObserver'in window){
 const observer=new IntersectionObserver(entries=>{const visible=entries.find(e=>e.isIntersecting)?.target.id;if(!visible)return;for(const link of links){if(link.hash===`#${visible}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}},{rootMargin:'-15% 0px -60% 0px'});
 for(const link of links)observer.observe(document.querySelector(link.hash));
}
