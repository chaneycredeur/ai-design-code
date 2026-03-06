import styles from './my-card.scss?inline';

export class MyCard extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="card">
        <div class="card__header">
          <slot name="header"></slot>
        </div>
        <div class="card__body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('my-card', MyCard);
