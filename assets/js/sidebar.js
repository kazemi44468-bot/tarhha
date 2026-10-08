(function(){
'use strict';
const d=document,b=d.body;
const nav=[
{id:'home',label:'نخست',href:'index.html',icon:'۰۱'},
{id:'plans',label:'معرفی',href:'pages/plans.html',icon:'۰۲'},
{id:'shahidportal',label:'شهیدپورتال',href:'pages/shahidportal-tarh.html',icon:'۰۳',children:[
{id:'shahidbank',label:'بانک شهدا',href:'pages/shahidbank-tarh.html',icon:'۰۳-۱'},
{id:'will-bank',label:'بانک وصیت‌نامه',href:'pages/will-bank-tarh.html',icon:'۰۳-۲'},
{id:'patogh',label:'پاتوق شهدا',href:'pages/patugh-tarh.html',icon:'۰۳-۳',children:[
{id:'wdja',label:'ودجا',href:'pages/wdja-tarh.html',icon:'۰۳-۳-۱'}
]},
{id:'narrative-bank',label:'بانک روایت',href:'pages/narrative-bank-tarh.html',icon:'۰۳-۴'},
{id:'calendar',label:'تقویم شهدا',href:'pages/calendar-tarh.html',icon:'۰۳-۵'},
{id:'atlas-melli',label:'اطلس شهدا',href:'pages/atlas-shohada-tarh.html',icon:'۰۳-۶'},
{id:'operations-bank',label:'بانک عملیات‌ها',href:'pages/operations-bank-tarh.html',icon:'۰۳-۷'},
{id:'services-welfare',label:'خدمات و رفاهیات',href:'pages/services-welfare-tarh.html',icon:'۰۳-۸'},
{id:'followup-response',label:'پیگیری و پاسخگویی',href:'pages/followup-response-tarh.html',icon:'۰۳-۹'},
{id:'family-market',label:'بازار خانواده شهدا',href:'pages/family-market-tarh.html',icon:'۰۳-۱۰'},
{id:'multimedia',label:'چندرسانه‌ای شهدا',href:'pages/multimedia-tarh.html',icon:'۰۳-۱۱'},
{id:'treasure',label:'گنجینه شهدا',href:'pages/treasure-tarh.html',icon:'۰۳-۱۲'},
{id:'khadem-shohada',label:'خادم شهدا',href:'pages/khadem-shohada-tarh.html',icon:'۰۳-۱۳'},
{id:'cyber-shohada',label:'شبکه سایبری شهدا',href:'pages/cyber-shohada-tarh.html',icon:'۰۳-۱۴'}
]};
const defaultOpen=new Set(['shahidportal']);
const current=b.dataset.sidebarPage||'home';
const pathname=location.pathname;
const pagesAt=pathname.indexOf('/pages/');
const root=pagesAt>=0?pathname.slice(0,pagesAt+1):pathname.slice(0,pathname.lastIndexOf('/')+1);
const link=p=>root+p;
const has=x=>x.id===current||(x.children||[]).some(has);
const render=(items,level=0)=>items.map(x=>{
 if(level>10)return '';
 const active=current===x.id,child=Array.isArray(x.children)&&x.children.length>0,open=child&&(has(x)||defaultOpen.has(x.id));
 const itemClass=(level?'sp-subitem':'sp-item')+(active?' active':'');
 const anchor='<a class="'+itemClass+'" href="'+link(x.href)+'"'+(active?' aria-current="page"':'')+'><span class="sp-icon" aria-hidden="true">'+x.icon+'</span><span class="sp-label">'+x.label+'</span></a>';
 const toggle=child?'<button class="sp-sub-toggle" type="button" aria-label="'+(open?'بستن':'باز کردن')+' زیرمنوی '+x.label+'" aria-expanded="'+(open?'true':'false')+'"><span class="sp-branch-icon" aria-hidden="true"></span></button>':'';
 return '<div class="sp-group sp-depth-'+level+' sp-cat-'+x.id+' '+(open?'has-active':'')+'"><div class="sp-item-wrap">'+anchor+toggle+'</div>'+(child?'<div class="sp-sub '+(open?'is-open':'')+'">'+render(x.children,level+1)+'</div>':'')+'</div>';
}).join('');
const side=d.createElement('aside');side.className='sp-sidebar menu-expanded';side.setAttribute('aria-label','منوی کناری طرح و برنامه‌ها');
side.innerHTML='<button class="sp-toggle" type="button" aria-label="جمع و باز کردن منوی کناری" aria-expanded="true"><span></span><span></span><span></span></button><div class="sp-brand"><span class="sp-mark">ط</span><div class="sp-brand-text"><strong>طرح و برنامه‌ها</strong><small>مرجع ایده، طرح، برنامه و توسعه</small></div></div><nav class="sp-nav" aria-label="منوی اصلی طرح و برنامه‌ها">'+render(nav)+'</nav>';
d.body.prepend(side);d.body.classList.add('menu-body-expanded');
side.querySelectorAll('.sp-sub-toggle').forEach(btn=>btn.addEventListener('click',e=>{
 e.preventDefault();e.stopPropagation();const group=btn.closest('.sp-group'),sub=group&&group.querySelector(':scope > .sp-sub');if(!sub)return;
 const open=sub.classList.toggle('is-open');btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',(open?'بستن':'باز کردن')+' زیرمنوی '+group.querySelector(':scope > .sp-item-wrap .sp-label').textContent);
 group.classList.toggle('has-open',open);
}));
const toggle=side.querySelector('.sp-toggle');
toggle.onclick=()=>{const opening=!side.classList.contains('menu-expanded');side.classList.toggle('menu-collapsed',!opening);side.classList.toggle('menu-expanded',opening);d.body.classList.toggle('menu-body-expanded',opening);toggle.setAttribute('aria-expanded',String(opening))};
if(window.innerWidth<=850){
 d.body.classList.remove('menu-body-expanded');side.classList.remove('menu-expanded');side.classList.add('menu-collapsed');
 const btn=d.createElement('button');btn.className='sp-mobile-btn';btn.type='button';btn.setAttribute('aria-label','باز کردن منوی کناری');d.body.appendChild(btn);
 const ov=d.createElement('div');ov.className='sp-overlay';d.body.appendChild(ov);
 const close=()=>{side.classList.remove('is-open');ov.classList.remove('is-open')};
 btn.onclick=()=>{side.classList.add('is-open');ov.classList.add('is-open')};ov.onclick=close;
 side.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{if(!a.closest('.sp-group')?.querySelector(':scope > .sp-sub'))close()}));
}
})();