(function () {
  const d = document, b = d.body;

  const nav = [
    { id: 'home', label: 'نخست', href: 'index.html', icon: '۰۱' },
    {
      id: 'plans', label: 'طرح‌ها', href: 'index.html#plans', icon: '۰۲',
      children: [
        {
          id: 'shahidportal', label: 'شهیدپورتال', href: 'pages/shahidportal-tarh.html', icon: '۰۲-۱',
          children: [
            { id: 'shahidbank', label: 'بانک شهدا', href: 'pages/shahidbank-tarh.html', icon: '۰۲-۱-۱' },
            { id: 'will-bank', label: 'بانک وصیت‌نامه', href: 'pages/will-bank-tarh.html', icon: '۰۲-۱-۲' },
            {
              id: 'patogh', label: 'پاتوق شهدا', href: 'pages/patugh-tarh.html', icon: '۰۲-۱-۳',
              children: [
                { id: 'wdja', label: 'ودجا', href: 'pages/wdja-tarh.html', icon: '۰۲-۱-۳-۱' }
              ]
            },
            { id: 'narrative-bank', label: 'بانک روایت', href: 'pages/narrative-bank-tarh.html', icon: '۰۲-۱-۴' },
            { id: 'calendar', label: 'تقویم شهدا', href: 'pages/calendar-tarh.html', icon: '۰۲-۱-۵' },
            { id: 'atlas-melli', label: 'اطلس شهدا', href: 'pages/atlas-shohada-tarh.html', icon: '۰۲-۱-۶' },
            { id: 'operations-bank', label: 'بانک عملیات‌ها', href: 'pages/operations-bank-tarh.html', icon: '۰۲-۱-۷' },
            { id: 'services-welfare', label: 'خدمات و رفاهیات', href: 'pages/services-welfare-tarh.html', icon: '۰۲-۱-۸' },
            { id: 'followup-response', label: 'پیگیری و پاسخگویی', href: 'pages/followup-response-tarh.html', icon: '۰۲-۱-۹' },
            { id: 'family-market', label: 'بازار خانواده شهدا', href: 'pages/family-market-tarh.html', icon: '۰۲-۱-۱۰' },
            { id: 'multimedia', label: 'چندرسانه‌ای شهدا', href: 'pages/multimedia-tarh.html', icon: '۰۲-۱-۱۱' },
            { id: 'treasure', label: 'گنجینه شهدا', href: 'pages/treasure-tarh.html', icon: '۰۲-۱-۱۲' },
            { id: 'khadem-shohada', label: 'خادم شهدا', href: 'pages/khadem-shohada-tarh.html', icon: '۰۲-۱-۱۳' },
            { id: 'cyber-shohada', label: 'شبکه سایبری شهدا', href: 'pages/cyber-shohada-tarh.html', icon: '۰۲-۱-۱۴' }
          ]
        }
      ]
    }
  ];

  const current = b.dataset.sidebarPage || 'home';
  const nested = current !== 'home';
  const link = p => (nested ? '../' + p : p);

  // آیا این آیتم یا یکی از فرزندانش فعال است؟
  const has = x => x.id === current || (x.children || []).some(has);

  // آیا این آیتم یا یکی از فرزندانش زیرمنوی باز دارد؟
  const hasOpenChild = x => (x.children || []).some(c => has(c) || hasOpenChild(c));

  const render = (items, level = 0) =>
    items
      .map(x => {
        const active = current === x.id;
        const child = !!(x.children && x.children.length);
        const open = child && (has(x) || hasOpenChild(x));
        const activePath = has(x);

        const itemClass =
          (level ? 'sp-subitem' : 'sp-item') +
          (active ? ' active' : '') +
          (activePath ? ' in-path' : '');

        const itemHTML =
          '<a class="' + itemClass + '" href="' + link(x.href) + '">' +
            '<span class="sp-icon" aria-hidden="true">' + x.icon + '</span>' +
            '<span class="sp-label">' + x.label + '</span>' +
          '</a>';

        const toggleHTML = child
          ? '<button class="sp-sub-toggle" type="button" ' +
              'aria-label="باز و بسته کردن ' + x.label + '" ' +
              'aria-expanded="' + (open ? 'true' : 'false') + '">' +
              '<span class="sp-chevron" aria-hidden="true"></span>' +
            '</button>'
          : '';

        const wrapHTML =
          '<div class="sp-item-wrap' + (child ? ' has-children' : '') + '">' +
            itemHTML + toggleHTML +
          '</div>';

        const subHTML = child
          ? '<div class="sp-sub' + (open ? ' is-open' : '') + '">' +
              render(x.children, level + 1) +
            '</div>'
          : '';

        return '<div class="sp-group sp-cat-' + x.id +
                (open ? ' has-open' : '') +
                (activePath ? ' has-active' : '') +
                (child ? ' has-children' : '') + '">' +
                wrapHTML + subHTML +
              '</div>';
      })
      .join('');

  const side = d.createElement('aside');
  side.className = 'sp-sidebar menu-expanded';
  side.setAttribute('aria-label', 'منوی کناری طرح و برنامه‌ها');
  side.innerHTML =
    '<button class="sp-toggle" type="button" ' +
      'aria-label="جمع و باز کردن منوی کناری" aria-expanded="true">' +
      '<span></span><span></span><span></span>' +
    '</button>' +
    '<div class="sp-brand">' +
      '<span class="sp-mark">ط</span>' +
      '<div class="sp-brand-text">' +
        '<strong>طرح و برنامه‌ها</strong>' +
        '<small>مرجع ایده، طرح، برنامه و توسعه</small>' +
      '</div>' +
    '</div>' +
    '<nav class="sp-nav" aria-label="منوی اصلی طرح و برنامه‌ها">' +
      render(nav) +
    '</nav>';

  d.body.prepend(side);
  d.body.classList.add('menu-body-expanded');

  // --- هندلر دکمه‌های زیرمنو ---
  side.querySelectorAll('.sp-sub-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const group = btn.closest('.sp-group');
      const sub = group && group.querySelector(':scope > .sp-sub');
      if (!sub) return;

      const willOpen = !sub.classList.contains('is-open');
      sub.classList.toggle('is-open', willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
      group.classList.toggle('has-open', willOpen);
    });
  });

  // --- هندلر جمع/باز کردن کل منو ---
  const toggle = side.querySelector('.sp-toggle');
  toggle.onclick = () => {
    const open = !side.classList.contains('menu-collapsed');
    side.classList.toggle('menu-collapsed', open);
    side.classList.toggle('menu-expanded', !open);
    d.body.classList.toggle('menu-body-expanded', !open);
    toggle.setAttribute('aria-expanded', String(!open));
  };

  // --- حالت موبایل ---
  if (window.innerWidth <= 850) {
    d.body.classList.remove('menu-body-expanded');
    side.classList.remove('menu-expanded');
    side.classList.add('menu-collapsed');

    const btn = d.createElement('button');
    btn.className = 'sp-mobile-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'باز کردن منوی کناری');
    d.body.appendChild(btn);

    const ov = d.createElement('div');
    ov.className = 'sp-overlay';
    d.body.appendChild(ov);

    const close = () => {
      side.classList.remove('is-open');
      ov.classList.remove('is-open');
    };
    btn.onclick = () => {
      side.classList.add('is-open');
      ov.classList.add('is-open');
    };
    ov.onclick = close;

    side.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (!a.closest('.sp-group')?.querySelector(':scope > .sp-sub')) close();
      });
    });
  }
})();