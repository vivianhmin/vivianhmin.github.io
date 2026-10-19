/* Museum of Vivian Min — site menu (top-right, expandable).
   Edit FLOORS below to add or rename pages; every page that loads this file updates. */
(() => {
  const FLOORS = [
    { n: 4, label: 'Visitor Services', items: [
      { t: 'About Me', href: 'about.html' },
      { t: 'Résumé', href: 'https://drive.google.com/file/d/1c6DMm8Z1MP-MToHDBZrGJSLy36__Mzmx/view?usp=drive_link', ext: true } ] },
    { n: 3, label: 'Professional', items: [
      { t: 'Player Redesign', href: 'player-redesign.html' },
      { t: 'FAQ Chatbot', href: 'faq-chatbot.html' },
      { t: 'Beat, Meet, Lose', href: 'beat-meet-lose.html' },
      { t: 'Digital Transformation', href: 'digital-transformation.html' }, { t: 'Brochure Design' } ] },
    { n: 2, label: 'Academic', items: [ { t: 'Attention, Please!', href: 'attention-please.html' }, { t: 'Moxy LES' }, { t: 'Beyond the Screen' } ] },
    { n: 1, label: 'Personal', items: [ { t: 'POOM Identity Design' } ] },
  ];

  const here = location.pathname.split('/').pop() || 'index.html';
  const css = `
  .mv-btn{position:fixed;top:12px;right:14px;z-index:1000;width:44px;height:44px;border-radius:50%;border:1px solid rgba(0,0,0,.12);
    background:rgba(255,255,255,.88);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);cursor:pointer;display:grid;place-items:center;
    box-shadow:0 4px 14px rgba(40,30,20,.10);transition:background .2s}
  .mv-btn i{position:absolute;left:13px;right:13px;height:2px;border-radius:2px;background:#1b1b1b;transition:transform .3s,opacity .2s}
  .mv-btn i:nth-child(1){transform:translateY(-6px)}.mv-btn i:nth-child(3){transform:translateY(6px)}
  .mv-open .mv-btn i:nth-child(1){transform:rotate(45deg)}.mv-open .mv-btn i:nth-child(2){opacity:0}.mv-open .mv-btn i:nth-child(3){transform:rotate(-45deg)}
  .mv-panel{position:fixed;top:66px;right:14px;z-index:999;width:min(340px,calc(100vw - 28px));max-height:calc(100dvh - 86px);overflow:auto;
    background:#fdfcf9;color:#1b1b1b;border:1px solid rgba(0,0,0,.08);border-radius:14px;box-shadow:0 24px 60px rgba(40,30,20,.18);
    font-family:'Manrope',-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif;padding:16px 18px 18px;
    opacity:0;transform:translateY(-8px) scale(.98);transform-origin:top right;pointer-events:none;transition:opacity .22s,transform .22s}
  .mv-open .mv-panel{opacity:1;transform:none;pointer-events:auto}
  .mv-panel a{color:inherit;text-decoration:none}
  .mv-top{display:flex;justify-content:space-between;align-items:center;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8b8781;
    padding-bottom:12px;border-bottom:1px solid #e6e2dc}
  .mv-top a{letter-spacing:.06em;text-transform:none;font-size:13px;color:#1b1b1b;border-bottom:1px solid #cfc9c0}
  .mv-fl{border-bottom:1px solid #eeeae5}
  .mv-fl > button{all:unset;box-sizing:border-box;width:100%;display:flex;align-items:center;gap:12px;padding:12px 0;cursor:pointer;font-size:15px;font-weight:600}
  .mv-fl > button b{font:300 26px/1 inherit;width:22px;color:#1b1b1b}
  .mv-fl > button span{flex:1}
  .mv-fl > button::after{content:"+";font-weight:400;color:#8b8781;font-size:18px}
  .mv-fl.on > button::after{content:"−"}
  .mv-fl ul{list-style:none;margin:0;padding:0 0 10px 34px;display:none}
  .mv-fl.on ul{display:block}
  .mv-fl li{font-size:14.5px;padding:5px 0}
  .mv-fl li a:hover{color:#c0392b}
  .mv-fl li.cur a{font-weight:700}
  .mv-fl li.cur a::before{content:"● ";font-size:9px;vertical-align:2px;color:#c0392b}
  .mv-fl li.soon{color:#aaa49b}
  .mv-fl li.soon small{font-size:11px;letter-spacing:.06em;margin-left:6px}
  .mv-sec{margin-top:14px}
  .mv-sec h6{margin:0 0 6px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8b8781;font-weight:600}
  .mv-sec a{display:flex;gap:10px;font-size:14px;padding:5px 0;color:#3a3835}
  .mv-sec a small{color:#aaa49b;font-variant-numeric:tabular-nums;width:18px}
  .mv-sec a:hover{color:#c0392b}
  .mv-scrim{position:fixed;inset:0;z-index:998;display:none}
  .mv-open .mv-scrim{display:block}
  /* inside the sticky header on case-study pages */
  .bar .mv-btn{position:relative;top:auto;right:auto;width:38px;height:38px;flex:0 0 auto;box-shadow:none}
  .bar .mv-btn i{left:11px;right:11px}
  @media (max-width:560px){ .bar .where{display:none} }`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const root = document.documentElement;
  const btn = document.createElement('button');
  btn.className = 'mv-btn'; btn.setAttribute('aria-label', 'Open menu'); btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<i></i><i></i><i></i>';

  const curFloor = (FLOORS.find(f => f.items.some(it => it.href === here)) || {}).n;
  const floorsHTML = FLOORS.map(f => `
    <div class="mv-fl${f.n === curFloor ? ' on' : ''}">
      <button aria-expanded="${f.n === curFloor}"><b>${f.n}</b><span>${f.label}</span></button>
      <ul>${f.items.map(it => it.href
        ? `<li class="${it.href === here ? 'cur' : ''}"><a href="${it.href}"${it.ext ? ' target="_blank" rel="noopener"' : ''}>${it.t}${it.ext ? ' ↗' : ''}</a></li>`
        : `<li class="soon">${it.t}<small>Coming soon</small></li>`).join('')}</ul>
    </div>`).join('');

  // "On this page": numbered section headings on case-study pages
  const heads = [...document.querySelectorAll('main section > h2')];
  heads.forEach((h, k) => { if(!h.parentElement.id) h.parentElement.id = 's' + (k + 1); });
  const secHTML = heads.length ? `<div class="mv-sec"><h6>On this page</h6>${heads.map((h, k) => {
    const num = h.querySelector('small') ? h.querySelector('small').textContent : String(k + 1).padStart(2, '0');
    const txt = [...h.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim() || h.textContent.replace(num, '').trim();
    return `<a href="#${h.parentElement.id}"><small>${num}</small>${txt}</a>`; }).join('')}</div>` : '';

  const panel = document.createElement('nav');
  panel.className = 'mv-panel'; panel.setAttribute('aria-label', 'Site menu');
  panel.innerHTML = `<div class="mv-top"><span>Floor Guide</span><a href="index.html#guide">Open brochure</a></div>${floorsHTML}${secHTML}`;
  const scrim = document.createElement('div'); scrim.className = 'mv-scrim';

  const bar = document.querySelector('header.bar');
  if(bar) bar.appendChild(btn); else document.body.appendChild(btn);
  document.body.append(scrim, panel);

  const set = open => { root.classList.toggle('mv-open', open); btn.setAttribute('aria-expanded', String(open)); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); };
  btn.addEventListener('click', e => { e.stopPropagation(); set(!root.classList.contains('mv-open')); });
  scrim.addEventListener('click', () => set(false));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') set(false); });
  panel.addEventListener('click', e => {
    const fb = e.target.closest('.mv-fl > button');
    if(fb){ const fl = fb.parentElement, on = fl.classList.toggle('on'); fb.setAttribute('aria-expanded', String(on)); return; }
    if(e.target.closest('a')) set(false);
  });
  // keep the gallery's wheel/swipe handlers from reacting while the menu is open
  ['wheel', 'touchstart', 'touchend', 'keydown'].forEach(ev => panel.addEventListener(ev, e => e.stopPropagation(), { passive: true }));
})();
