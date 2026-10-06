(function(){const d=document,b=d.body;const nav=[
{id:'home',label:'نخست',href:'index.html',icon:'۰۱',children:[
{id:'about',label:'معرفی',href:'index.html#about',icon:'۰۱-۱'},
{id:'mission',label:'ماموریت',href:'index.html#mission',icon:'۰۱-۲'},
{id:'vision',label:'چشم‌انداز',href:'index.html#vision',icon:'۰۱-۳'},
{id:'goals',label:'اهداف',href:'index.html#goals',icon:'۰۱-۴'},
{id:'structure',label:'ساختار و معماری',href:'index.html#structure',icon:'۰۱-۵'},
{id:'workflow',label:'چرخه توسعه',href:'index.html#workflow',icon:'۰۱-۶'},
{id:'principles',label:'اصول و قواعد',href:'index.html#principles',icon:'۰۱-۷'},
{id:'governance',label:'راهبری و وضعیت',href:'index.html#governance',icon:'۰۱-۸'},
{id:'integration',label:'ارتباط با پروژه‌ها',href:'index.html#integration',icon:'۰۱-۹'},
{id:'documents',label:'اسناد و مرجع‌ها',href:'index.html#documents',icon:'۰۱-۱۰'}]},
{id:'plans',label:'طرح‌ها',href:'index.html#plans',icon:'۰۲',children:[
{id:'shahidportal',label:'شهیدپورتال',href:'shahidportal-tarh.html',icon:'۰۲-۱'},
{id:'patogh',label:'پاتوق شهدا',href:'patugh-tarh.html',icon:'۰۲-۲'},
{id:'wdja',label:'ودجا',href:'wdja-tarh.html',icon:'۰۲-۳'},
{id:'calendar',label:'تقویم شهدا',href:'calendar-tarh.html',icon:'۰۲-۴'},
{id:'atlas-melli',label:'اطلس ملی شهدا',href:'atlas-melli-tarh.html',icon:'۰۲-۵'}]}];
const current=b.dataset.sidebarPage||'home';const has=x=>x.id===current||(x.children||[]).some(has);const render=items=>items.map(x=>'<div class="sp-group '+(has(x)?'has-active':'')+'"><div class="sp-item-wrap"><a class="sp-item '+(current===x.id?'active':'')+'" href="'+x.href+'"><span class="sp-icon">'+x.icon+'</span><span class="sp-label">'+x.label+'</span></a>'+(x.children?'<button class="sp-submenu-toggle '+(has(x)?'is-open':'')+'" type="button" aria-label="نمایش زیرمنوی '+x.label+'" aria-expanded="'+(has(x)?'true':'false')+'"><span class="sp-chevron" aria-hidden="true"></span></button>':'')+'</div>'+(x.children?'<div class="sp-sub '+(has(x)?'is-open':'')+'">'+render(x.children)+'</div>':'')+'</div>').join('');
const side=d.createElement('aside');side.className='sp-sidebar';side.innerHTML='<button class="sp-toggle" type="button" aria-label="باز کردن منوی کناری" aria-expanded="false"><span></span><span></span><span></span></button><div class="sp-brand"><span class="sp-mark">ط</span><div class="sp-brand-text"><strong>طرح و برنامه‌ها</strong><small>مرجع ایده، طرح، برنامه و توسعه</small></div></div><nav class="sp-nav" aria-label="منوی اصلی طرح و برنامه‌ها">'+render(nav)+'</nav>';d.body.prepend(side);
const main=d.querySelector('.sp-main'),toggle=side.querySelector('.sp-toggle');toggle.onclick=()=>{const open=!side.classList.contains('menu-expanded');side.classList.toggle('menu-expanded',open);toggle.setAttribute('aria-expanded',String(open))};side.querySelectorAll('.sp-submenu-toggle').forEach(button=>button.addEventListener('click',()=>{const sub=button.closest('.sp-group').querySelector(':scope > .sp-sub'),open=!sub.classList.contains('is-open');sub.classList.toggle('is-open',open);button.classList.toggle('is-open',open);button.setAttribute('aria-expanded',String(open))}));if(main){const btn=d.createElement('button');btn.className='sp-mobile-btn';btn.type='button';btn.setAttribute('aria-label','باز کردن منوی کناری');d.body.appendChild(btn);const ov=d.createElement('div');ov.className='sp-overlay';d.body.appendChild(ov);const close=()=>{side.classList.remove('is-open');ov.classList.remove('is-open')};btn.onclick=()=>{side.classList.add('is-open');ov.classList.add('is-open')};ov.onclick=close;side.querySelectorAll('a').forEach(a=>a.addEventListener('click',close))}if(!main){const m=d.createElement('main');m.className='sp-main';while(side.nextSibling)d.body.appendChild(side.nextSibling);d.body.appendChild(m)}})();