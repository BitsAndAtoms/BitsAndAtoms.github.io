(function () {
  function setActiveNavLink() {
    // Use the last segment of the path, or default to 'index.html' if empty (e.g., root path)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav-link]').forEach((link) => {
      const target = link.getAttribute('href');
      if (target === currentPage) {
        link.classList.add('active');
      }
    });
  }

  function initNavToggle() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const menu = document.getElementById('primary-navigation');

    if (!toggle || !menu) {
      return;
    }

    const setExpanded = (expanded) => {
      toggle.setAttribute('aria-expanded', String(expanded));
      menu.classList.toggle('is-open', expanded);
    };

    const updateForViewport = () => {
      setExpanded(window.innerWidth >= 768);
    };

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      setExpanded(!isExpanded);
    });

    menu.addEventListener('click', (event) => {
      if (event.target.matches('a') && window.innerWidth < 768) {
        setExpanded(false);
      }
    });

    window.addEventListener('resize', updateForViewport);
    updateForViewport();
  }

  function init() {
    document.documentElement.classList.add('js-enabled');
    setActiveNavLink();
    initNavToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
