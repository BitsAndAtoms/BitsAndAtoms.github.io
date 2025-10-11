(function loadCommonHead() {
  const head = document.getElementById('common-head');
  if (!head) {
    return;
  }

  fetch('common-head.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load shared head content.');
      }
      return response.text();
    })
    .then((html) => {
      const template = document.createElement('template');
      template.innerHTML = html.trim();
      Array.from(template.content.childNodes).forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) {
          return;
        }

        if (node.tagName === 'SCRIPT') {
          const script = document.createElement('script');
          Array.from(node.attributes).forEach((attr) => script.setAttribute(attr.name, attr.value));
          script.textContent = node.textContent;
          head.appendChild(script);
        } else {
          head.appendChild(node);
        }
      });
    })
    .catch((error) => console.error(error));
})();
