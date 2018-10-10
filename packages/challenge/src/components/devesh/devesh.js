(function () {
  const template = document.createElement('template');

  template.innerHTML = `./devesh.html`;

  class DeveshComponent extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({
        mode: 'open'
      });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  window.customElements.define('hello-devesh', DeveshComponent);
})();