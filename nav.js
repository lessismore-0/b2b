// 공통 상단 메뉴: ☰ 버튼을 누르면 툴 목록이 열리고, 클릭하면 해당 페이지로 이동한다.
// 새 툴을 추가하려면 PAGES에 한 줄 추가하고 그 페이지에 <script src="nav.js"></script>를 넣으면 된다.
(function () {
  const PAGES = [
    { href: 'index.html', label: '입찰 시뮬레이션', desc: '예산·지출 기반 투찰율/투찰가 계산' },
    { href: 'bid-rate.html', label: '투찰율 계산기', desc: '사업 예산·투찰가로 투찰율 계산' },
    { href: 'survey.html', label: '만족도 분석', desc: '질문별 5점 척도·NPS·총평' },
  ];
  const BAR_H = 52;

  const file = location.pathname.split('/').pop() || 'index.html';
  const current = PAGES.find(p => p.href === file) || PAGES[0];

  const style = document.createElement('style');
  style.textContent = `
    .site-nav { position:fixed; top:0; left:0; right:0; height:${BAR_H}px; z-index:1000; display:flex; align-items:center; gap:10px;
      padding:0 14px; background:#fff; border-bottom:1px solid #e6e9ef; box-shadow:0 1px 4px rgba(0,0,0,.04);
      font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif; }
    .site-nav .nav-btn { width:38px; height:38px; border:none; background:transparent; border-radius:8px; cursor:pointer;
      display:flex; flex-direction:column; justify-content:center; align-items:center; gap:5px; padding:0; }
    .site-nav .nav-btn:hover, .site-nav .nav-btn[aria-expanded="true"] { background:#f1f3f6; }
    .site-nav .nav-btn span { display:block; width:20px; height:2px; background:#333; border-radius:2px; }
    .site-nav .nav-title { font-size:15px; font-weight:700; color:#222; }
    .site-nav .nav-title small { font-weight:400; color:#888; margin-left:6px; font-size:13px; }
    .nav-overlay { position:fixed; inset:0; background:rgba(0,0,0,.25); z-index:1001; opacity:0; pointer-events:none; transition:opacity .2s; }
    .nav-drawer { position:fixed; top:0; bottom:0; left:0; width:280px; max-width:85vw; background:#fff; z-index:1002;
      transform:translateX(-100%); transition:transform .2s; box-shadow:2px 0 12px rgba(0,0,0,.12); padding:14px;
      font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif; }
    .nav-open .nav-overlay { opacity:1; pointer-events:auto; }
    .nav-open .nav-drawer { transform:none; }
    .nav-drawer .nav-head { font-size:13px; color:#888; font-weight:600; padding:8px 10px 12px; }
    .nav-drawer a { display:block; padding:12px 12px; border-radius:9px; text-decoration:none; color:#222; margin-bottom:4px; }
    .nav-drawer a:hover { background:#f4f6f9; }
    .nav-drawer a.active { background:#eef5ff; box-shadow:inset 3px 0 0 #2d6cdf; }
    .nav-drawer a b { display:block; font-size:15px; }
    .nav-drawer a span { display:block; font-size:12px; color:#888; margin-top:3px; }
    @media print {
      .site-nav, .nav-overlay, .nav-drawer { display:none !important; }
      body.has-nav { padding-top:0 !important; }
    }`;
  document.head.appendChild(style);

  const bar = document.createElement('div');
  bar.className = 'site-nav';
  bar.innerHTML = `<button class="nav-btn" aria-label="메뉴 열기" aria-expanded="false"><span></span><span></span><span></span></button>
    <div class="nav-title">B2B 툴<small>${current.label}</small></div>`;
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  const drawer = document.createElement('nav');
  drawer.className = 'nav-drawer';
  drawer.innerHTML = '<div class="nav-head">메뉴</div>' + PAGES.map(p =>
    `<a href="${p.href}" class="${p === current ? 'active' : ''}"><b>${p.label}</b><span>${p.desc}</span></a>`).join('');

  document.body.prepend(bar, overlay, drawer);
  document.body.classList.add('has-nav');
  document.body.style.paddingTop = (parseFloat(getComputedStyle(document.body).paddingTop) + BAR_H) + 'px';

  const btn = bar.querySelector('.nav-btn');
  const setOpen = open => {
    document.body.classList.toggle('nav-open', open);
    btn.setAttribute('aria-expanded', open);
  };
  btn.addEventListener('click', () => setOpen(!document.body.classList.contains('nav-open')));
  overlay.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
})();
