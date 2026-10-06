(function(){const d=document,b=d.body;const nav=[
{id:'home',label:'خانه',href:'index.html',icon:'۰۱'},
{id:'guide',label:'راهنما و معماری',href:'architecture.html',icon:'۰۲',children:[
{id:'philosophy',label:'فلسفه و روش',href:'philosophy.html',icon:'۰۲-۱'},
{id:'architecture',label:'معماری مخزن',href:'architecture.html',icon:'۰۲-۲'},
{id:'development',label:'قواعد توسعه',href:'development.html',icon:'۰۲-۳'}
]},
{id:'plans',label:'طرح‌ها',href:'index.html#plans',icon:'۰۳',children:[
{id:'national',label:'ملی و راهبردی',href:'categories.html#national',icon:'۰۳-۱',children:[
{id:'shahidportal',label:'شهیدپورتال',href:'shahidportal-tarh.html',icon:'۰۳-۱-۱'},
{id:'atlas-melli',label:'اطلس ملی شهدا',href:'atlas-melli-tarh.html',icon:'۰۳-۱-۲'}]},
{id:'culture',label:'فرهنگی و اجتماعی',href:'categories.html#culture',icon:'۰۳-۲',children:[
{id:'patogh',label:'پاتوق شهدا',href:'patugh-tarh.html',icon:'۰۳-۲-۱'},
{id:'wdja',label:'ودجا',href:'wdja-tarh.html',icon:'۰۳-۲-۲'}]},
{id:'technology',label:'فناوری و پلتفرم',href:'categories.html#technology',icon:'۰۳-۳'},
{id:'services',label:'خدمات و ابزارها',href:'categories.html#services',icon:'۰۳-۴',children:[
{id:'calendar',label:'تقویم شهدا',href:'calendar-tarh.html',icon:'۰۳-۴-۱'}]}]},
{id:'categories',label:'دسته‌بندی‌ها',href:'categories.html',icon:'۰۴'},
{id:'workflow',label:'فرآیند توسعه',href:'philosophy.html#workflow',icon:'۰۵'}];
const current=b.dataset.sidebarPage||'home';
const has=(x)=>x.id===current||(x.children||[]).some(has);
const render=(items,level=0)=>items.map(x=>'<div class="sp-group '+(has(x)?'has-active':'')+'"><div class="sp-item-wrap"><a class="sp-item '+(current===x.id?'active':'')+'" href="'+x.href+'"><span class="sp-icon">'+x.icon+'</span><span class="sp-label">'+x.label+'</span></a>'+(x.children?'<button class="sp-submenu-toggle '+(has(x)?'is-open':'')+'" type="button" aria-label="نمایش زیرمنوی '+x.label+'" aria-expanded="'+(has(x)?'true':'false')+'"><span class="sp-chevron" aria-hidden="true"></span></button>':'')+'</div>'+(x.children?'<div class="sp-sub '+(has(x)?'is-open':'')+'">'+render(x.children,level+1)+'</div>':'')+'</div>').join('');
const side=d.createElement('aside');side.className='sp-sidebar';side.innerHTML='<button class="sp-toggle" type="button" aria-label="باز کردن منوی کناری" aria-expanded="false"><span></span><span></span><span></span></button><div class="sp-brand"><span class="sp-mark">ط</span><div class="sp-brand-text"><strong>طرح و برنامه‌ها</strong><small>مرجع ایده، طرح، برنامه و توسعه</small></div></div><nav class="sp-nav">'+render(nav)+'</nav>';
d.body.prepend(side);
const main=d.querySelector('.sp-main'),toggle=side.querySelector('.sp-toggle');
toggle.onclick=()=>{const open=!side.classList.contains('menu-expanded');side.classList.toggle('menu-expanded',open);toggle.setAttribute('aria-expanded',String(open))};
side.querySelectorAll('.sp-submenu-toggle').forEach(button=>button.addEventListener('click',()=>{const sub=button.closest('.sp-group').querySelector(':scope > .sp-sub'),open=!sub.classList.contains('is-open');sub.classList.toggle('is-open',open);button.classList.toggle('is-open',open);button.setAttribute('aria-expanded',String(open))}));
if(main){const btn=d.createElement('button');btn.className='sp-mobile-btn';btn.type='button';btn.setAttribute('aria-label','باز کردن منوی کناری');d.body.appendChild(btn);const ov=d.createElement('div');ov.className='sp-overlay';d.body.appendChild(ov);const close=()=>{side.classList.remove('is-open');ov.classList.remove('is-open')};btn.onclick=()=>{side.classList.add('is-open');ov.classList.add('is-open')};ov.onclick=close;side.querySelectorAll('a').forEach(a=>a.addEventListener('click',close))}if(!main){const m=d.createElement('main');m.className='sp-main';while(side.nextSibling)d.body.appendChild(side.nextSibling);d.body.appendChild(m)}})();