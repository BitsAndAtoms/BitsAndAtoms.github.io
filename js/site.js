(function () {
  function fetchFragment(selector, url, callback) {
    const container = document.querySelector(selector);
    if (!container) {
      return;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        container.innerHTML = html;
        if (typeof callback === 'function') {
          callback(container);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function setActiveNavLink(header) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    header.querySelectorAll('[data-nav-link]').forEach((link) => {
      const target = link.getAttribute('href');
      if (target === currentPage || (!currentPage && target === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  function initNavToggle(header) {
    const toggle = header.querySelector('[data-nav-toggle]');
    const menu = header.querySelector('#primary-navigation');

    if (!toggle || !menu) {
      return;
    }

    const toggleMenu = () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      menu.classList.toggle('is-open', !isExpanded);
    };

    toggle.addEventListener('click', toggleMenu);

    menu.addEventListener('click', (event) => {
      if (event.target.matches('a') && window.innerWidth < 768) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        toggle.setAttribute('aria-expanded', 'true');
        menu.classList.add('is-open');
      } else {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
      }
    });

    if (window.innerWidth >= 768) {
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-open');
    }
  }

  function init() {
    document.documentElement.classList.add('js-enabled');
    fetchFragment('#site-header', 'header.html', (header) => {
      setActiveNavLink(header);
      initNavToggle(header);
    });
    fetchFragment('#site-footer', 'footer.html');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
