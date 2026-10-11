(function () {
  const sidebarMount = document.getElementById('sidebar-mount');
  const headerSearch = document.querySelector('.header-search');
  const mobileMenu = document.querySelector('.mobile-menu');
  const topbar = document.querySelector('.topbar');

  async function loadSidebar() {
    if (!sidebarMount) return;
    try {
      const basePath = location.pathname.includes('/blog/') ? '../' : './';
      const response = await fetch(basePath + 'components/sidebar.html');
      if (!response.ok) throw new Error('Sidebar request failed');
      sidebarMount.innerHTML = await response.text();
    } catch (error) {
      sidebarMount.innerHTML = `
        <aside class="sidebar" aria-label="PRINCE2 learning menu">
          <div class="sidebar-heading"><span class="eyebrow">PRINCE2 BLOG</span><strong>Learn the method</strong></div>
          <nav class="sidebar-nav">
            <a class="sidebar-link" href="../index.html">Home</a>
            <a class="sidebar-link" href="../blog/prince2-introduction.html">PRINCE2 introduction</a>
            <a class="sidebar-link" href="../blog/what-is-prince2.html">What is PRINCE2?</a>
            <a class="sidebar-link" href="../blog/prince2-7-overview.html">PRINCE2 7 overview</a>
            <a class="sidebar-link" href="../blog/prince2-project-management.html">Project management</a>
            <a class="sidebar-link" href="../blog/prince2-key-terms.html">Key terms</a>
            <a class="sidebar-link" href="../blog/sitemaps.html">Site maps</a>
          </nav>
        </aside>`;
    }
    wireSidebar();
  }

  function wireSidebar() {
    const isBlogPage = location.pathname.includes('/blog/');
    if (!isBlogPage) {
      document.querySelectorAll('.sidebar-link').forEach((link) => {
        const href = link.getAttribute('href') || '';
        if (href.startsWith('../')) link.setAttribute('href', href.slice(3));
      });
    }

    const current = location.pathname.replace(/\\/g, '/').split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-link').forEach((link) => {
      const target = link.getAttribute('href').split('/').pop();
      if (target === current || (current === '' && target === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    document.querySelectorAll('.sidebar-group-toggle').forEach((button) => {
      button.addEventListener('click', () => {
        const group = button.closest('.sidebar-group');
        const collapsed = group.classList.toggle('collapsed');
        button.setAttribute('aria-expanded', String(!collapsed));
        const chevron = button.querySelector('.chevron');
        if (chevron) chevron.textContent = collapsed ? '›' : '⌄';
      });
    });

    const currentLink = document.querySelector('.sidebar-link.active');
    if (currentLink) currentLink.scrollIntoView({ block: 'nearest' });
  }

  function wireSearch() {
    if (!headerSearch) return;
    headerSearch.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      const query = headerSearch.value.trim().toLowerCase();
      if (!query) return;

      const links = Array.from(document.querySelectorAll('.sidebar-link'));
      const match = links.find((link) => link.textContent.trim().toLowerCase().includes(query));
      if (match) {
        window.location.href = match.href;
      } else {
        const currentArticle = document.querySelector('.article');
        if (currentArticle) {
          const bodyText = currentArticle.textContent.toLowerCase();
          if (bodyText.includes(query)) {
            const hit = Array.from(currentArticle.querySelectorAll('h2, h3, p')).find((el) => el.textContent.toLowerCase().includes(query));
            if (hit) {
              hit.scrollIntoView({ behavior: 'smooth', block: 'center' });
              hit.style.outline = '3px solid rgba(4,170,109,.25)';
              setTimeout(() => { hit.style.outline = ''; }, 1600);
            }
            return;
          }
        }
        alert('No matching topic found. Try a term such as “principles”, “roles”, or “business case”.');
      }
    });
  }

  function wireMobileMenu() {
    const sidebar = sidebarMount;
    if (!mobileMenu || !topbar || !sidebar) return;

    const mediaQuery = window.matchMedia('(max-width: 820px)');
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-sidebar-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(backdrop);

    let open = false;

    function syncViewport() {
      if (mediaQuery.matches) {
        sidebar.classList.add('mobile-sidebar');
      } else {
        closeMenu();
        sidebar.classList.remove('mobile-sidebar');
      }
    }

    function openMenu() {
      if (!mediaQuery.matches) return;
      open = true;
      topbar.classList.add('is-open');
      sidebar.classList.add('mobile-sidebar', 'is-open');
      backdrop.classList.add('is-visible');
      document.body.classList.add('menu-open');
      mobileMenu.textContent = '×';
      mobileMenu.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-label', 'Close learning menu');
    }

    function closeMenu() {
      open = false;
      topbar.classList.remove('is-open');
      sidebar.classList.remove('is-open');
      backdrop.classList.remove('is-visible');
      document.body.classList.remove('menu-open');
      mobileMenu.textContent = '☰';
      mobileMenu.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-label', 'Open learning menu');
    }

    mobileMenu.addEventListener('click', () => {
      if (open) closeMenu();
      else openMenu();
    });

    backdrop.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && open) closeMenu();
    });

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncViewport);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(syncViewport);
    }

    syncViewport();
  }

  function setYear() {
    document.querySelectorAll('[data-year]').forEach((node) => {
      node.textContent = new Date().getFullYear();
    });
  }

  loadSidebar();
  wireSearch();
  wireMobileMenu();
  setYear();
})();
