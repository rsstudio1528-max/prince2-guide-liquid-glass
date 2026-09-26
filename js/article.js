(function(){
  const body = document.querySelector('#article-body');
  const toc = document.querySelector('#toc-links');
  const progress = document.querySelector('#progress-bar');
  if (!body) return;

  const headings = [...body.querySelectorAll('h2')];
  headings.forEach((heading, index) => {
    heading.id = `section-${index + 1}`;
    if (toc) {
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = `${String(index + 1).padStart(2, '0')} ${heading.textContent}`;
      toc.appendChild(link);
    }
  });

  function updateProgress(){
    if (!progress) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  }
  addEventListener('scroll', updateProgress, {passive:true});
  addEventListener('resize', updateProgress, {passive:true});
  updateProgress();

  if (toc && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        toc.querySelectorAll('a').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, {rootMargin:'-35% 0px -55% 0px'});
    headings.forEach(heading => obs.observe(heading));
  }
})();
