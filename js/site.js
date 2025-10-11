(function () {
  function loadIncludes() {
    const includeElements = document.querySelectorAll('[data-include]');

    if (!includeElements.length) {
      return Promise.resolve();
    }

    const loaders = Array.from(includeElements).map((element) => {
      const source = element.getAttribute('data-include');

      if (!source) {
        return Promise.resolve();
      }

      return fetch(source)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load include: ${source}`);
          }

          return response.text();
        })
        .then((html) => {
          element.outerHTML = html;
        })
        .catch((error) => {
          console.error(error);
          element.outerHTML = '';
        });
    });

    return Promise.all(loaders);
  }

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

  (function init() {
    const start = () => {
      document.documentElement.classList.add('js-enabled');

      loadIncludes()
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setActiveNavLink();
          initNavToggle();
        });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else {
      start();
    }
  })();
})();
