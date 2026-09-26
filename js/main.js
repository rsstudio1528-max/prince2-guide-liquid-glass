(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') root.classList.add('dark');

  function toggleOverlay(el, on){
    if (!el) return;
    el.classList.toggle('show', on);
    el.setAttribute('aria-hidden', String(!on));
    document.body.classList.toggle('overlay-open', on);
    if (on) {
      const input = el.querySelector('input');
      setTimeout(() => input && input.focus(), 80);
    }
  }

  function blogUrl(query){
    const fromArticle = /\/articles\//.test(location.pathname);
    const base = fromArticle ? '../' : './';
    return `${base}blog.html${query ? `?q=${encodeURIComponent(query)}` : ''}`;
  }

  document.addEventListener('click', event => {
    const openSearch = event.target.closest('[data-search-open]');
    const closeSearch = event.target.closest('[data-search-close]');
    const theme = event.target.closest('[data-theme-toggle]');
    const menuOpen = event.target.closest('[data-menu-open]');
    const menuClose = event.target.closest('[data-menu-close]');

    if (openSearch) toggleOverlay(document.querySelector('[data-search-overlay]'), true);
    if (closeSearch) toggleOverlay(document.querySelector('[data-search-overlay]'), false);
    if (menuOpen) toggleOverlay(document.querySelector('[data-mobile-overlay]'), true);
    if (menuClose) toggleOverlay(document.querySelector('[data-mobile-overlay]'), false);
    if (theme) {
      root.classList.toggle('dark');
      localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
    }
  });

  const globalSearch = document.querySelector('#global-search');
  const results = document.querySelector('#global-search-results');
  if (globalSearch && results) {
    function renderSearchLink(){
      const q = globalSearch.value.trim();
      if (!q) {
        results.innerHTML = '<p class="muted">Search titles, topics and keywords.</p>';
        return;
      }
      results.innerHTML = `<a class="search-result" href="${blogUrl(q)}"><span class="tag">SEARCH</span><strong>Search all PRINCE2 articles for “${escapeHtml(q)}”</strong><small>Open the article library</small></a>`;
    }
    globalSearch.addEventListener('input', renderSearchLink);
    globalSearch.addEventListener('keydown', event => {
      if (event.key !== 'Enter') return;
      const q = globalSearch.value.trim();
      if (!q) return;
      location.href = blogUrl(q);
    });
  }

  function escapeHtml(value){
    return value.replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  }

  addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.search-overlay.show, .mobile-menu-overlay.show').forEach(el => toggleOverlay(el, false));
    }
  });
})();
