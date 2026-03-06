import './my-button.scss';

export class MyButton extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'variant'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const label = this.getAttribute('label') || 'Button';
    const variant = this.getAttribute('variant') || 'primary';

    this.innerHTML = `
      <button class="btn btn--${variant}">
        ${label}
      </button>
    `;
  }
}

customElements.define('my-button', MyButton);
