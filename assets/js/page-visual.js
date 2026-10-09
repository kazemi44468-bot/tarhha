(function(){
  "use strict";
  function addVisualPlaceholder(){
    var hero=document.querySelector("main .hero, .wrap .hero, .hero");
    if(!hero||hero.querySelector("img, picture, video, .hero-logo, .hero-media, .page-visual-slot"))return;
    var title=hero.querySelector("h1");
    if(!title)return;
    hero.classList.add("has-visual-placeholder");
    var slot=document.createElement("div");
    slot.className="page-visual-slot";
    slot.setAttribute("role","img");
    slot.setAttribute("aria-label","جایگاه موقت تصویر شاخص برای "+title.textContent.trim());
    slot.innerHTML='<span class="page-visual-slot__mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M16 3.5 27.5 10v12L16 28.5 4.5 22V10L16 3.5Z" stroke="currentColor" stroke-width="1.3"/><path d="M16 8.5 22.5 12v8L16 23.5 9.5 20v-8L16 8.5Z" stroke="currentColor" stroke-width="1.2"/><path d="M16 12.5v7M12.5 16h7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></span><span class="page-visual-slot__label"><strong>جایگاه تصویر شاخص</strong>در انتظار تصویر اختصاصی</span>';
    hero.insertBefore(slot,hero.firstChild);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",addVisualPlaceholder,{once:true});else addVisualPlaceholder();
})();
