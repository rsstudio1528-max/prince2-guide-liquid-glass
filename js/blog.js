(function(){
  const search = document.querySelector('#archive-search');
  const count = document.querySelector('#result-count');
  const grid = document.querySelector('#article-grid');
  const filters = document.querySelector('#category-filters');
  if (!search || !count || !grid || !filters) return;

  const rows = [...grid.querySelectorAll('.article-row')];
  const buttons = [...filters.querySelectorAll('.filter-pill')];
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get('q') || '';
  let activeCategory = params.get('category') || 'All';

  search.value = initialQuery;
  const known = new Set(buttons.map(button => button.dataset.cat));
  if (!known.has(activeCategory)) activeCategory = 'All';

  function render(){
    const q = search.value.trim().toLowerCase();
    let visible = 0;
    rows.forEach(row => {
      const matchesCategory = activeCategory === 'All' || row.dataset.category.split('|').includes(activeCategory);
      const matchesQuery = !q || row.dataset.search.toLowerCase().includes(q);
      const show = matchesCategory && matchesQuery;
      row.hidden = !show;
      if (show) visible++;
    });
    count.textContent = `${visible} ${visible === 1 ? 'article' : 'articles'}`;
    buttons.forEach(button => button.classList.toggle('active', button.dataset.cat === activeCategory));
    syncUrl();
  }

  function syncUrl(){
    const url = new URL(location.href);
    if (search.value.trim()) url.searchParams.set('q', search.value.trim()); else url.searchParams.delete('q');
    if (activeCategory !== 'All') url.searchParams.set('category', activeCategory); else url.searchParams.delete('category');
    history.replaceState(null, '', url);
  }

  filters.addEventListener('click', event => {
    const button = event.target.closest('.filter-pill');
    if (!button) return;
    activeCategory = button.dataset.cat;
    render();
  });

  search.addEventListener('input', render);
  render();
})();
