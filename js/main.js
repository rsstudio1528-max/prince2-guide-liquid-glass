(function(){
  const root=document.documentElement;
  const saved=localStorage.getItem('theme');
  if(saved==='dark') root.classList.add('dark');

  document.addEventListener('click', e=>{
    const openSearch=e.target.closest('[data-search-open]');
    const closeSearch=e.target.closest('[data-search-close]');
    const theme=e.target.closest('[data-theme-toggle]');
    const menuOpen=e.target.closest('[data-menu-open]');
    const menuClose=e.target.closest('[data-menu-close]');
    if(openSearch) toggleOverlay(document.querySelector('[data-search-overlay]'),true);
    if(closeSearch) toggleOverlay(document.querySelector('[data-search-overlay]'),false);
    if(menuOpen) toggleOverlay(document.querySelector('[data-mobile-overlay]'),true);
    if(menuClose) toggleOverlay(document.querySelector('[data-mobile-overlay]'),false);
    if(theme){root.classList.toggle('dark');localStorage.setItem('theme',root.classList.contains('dark')?'dark':'light');}
  });
  function toggleOverlay(el,on){if(!el)return;el.classList.toggle('show',on);el.setAttribute('aria-hidden',String(!on));document.body.classList.toggle('overlay-open',on);if(on){const input=el.querySelector('input');setTimeout(()=>input&&input.focus(),80)}}
  const g=document.querySelector('#global-search'); const results=document.querySelector('#global-search-results');
  if(g){g.addEventListener('input',()=>{const q=g.value.trim().toLowerCase(); if(!q){results.innerHTML='<p class="muted">Search titles, topics and keywords.</p>';return;} const hits=ARTICLES.filter(a=>[a.title,a.excerpt,a.category,a.keywords].join(' ').toLowerCase().includes(q)).slice(0,7); results.innerHTML=hits.length?hits.map(a=>`<a class="search-result" href="article.html?id=${encodeURIComponent(a.id)}"><span class="tag">${a.category}</span><strong>${a.title}</strong><small>${a.readTime} min read</small></a>`).join(''):'<p class="muted">No matching articles yet.</p>';});}
  addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.search-overlay.show,.mobile-menu-overlay.show').forEach(el=>toggleOverlay(el,false));}});
})();
