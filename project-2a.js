/**
 * Copyright 2024 Christina
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

/**
 * `project-2a`
 * 
 * @demo index.html
 * @element project-2a
 */
export class Project2a extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "project-2a";
  }

  constructor() {
    super();
    this.seed = this.getInitialSeed();
    this.charAttributes = {
      accessories: 0,
      base: 1,
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      hatcolor: 0,
      hat: 'none',
      fire: false,
      walking: false,
      circle: false,
    };
  }

  // Lit reactive properties
  static get properties() {
    return {
      seed: { type: String },
      charAttributes: { type: Object },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: flex;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        margin: 1rem;
      }

      .wrapper {
        display: flex;
        flex-wrap: wrap;
      }

      .character-container {
        flex: 1;
        display: flex;
        justify-content: center;
      }


      wired-input,
      wired-combo,
      wired-checkbox {
        width: 100%;
      }

      h3 span {
        font-size: var(--project-2a-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    this.charAttributes[name] = type === 'checkbox' ? checked : value;
    this.requestUpdate();
    //this.updateSeedFromSettings();
  }

  updateCharacter() {
    const character = this.shadowRoot.querySelector('rpg-character');
    Object.entries(this.charAttributes).forEach(([key, value]) => {
      character[key] = value;
    });
    character.seed = this.seed;
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <div class="character-container">
          <rpg-character
          .seed="${this.seed}"
          width="300"
          height="400"
          .accessories="${this.charAttributes.accessories}"
          .base="${this.charAttributes.base}"
          .face="${this.charAttributes.face}"
          .faceitem="${this.charAttributes.faceitem}"
          .hair="${this.charAttributes.hair}"
          .pants="${this.charAttributes.pants}"
          .shirt="${this.charAttributes.shirt}"
          .skin="${this.charAttributes.skin}"
          .hatcolor="${this.charAttributes.hatcolor}"
          .hat="${this.charAttributes.hat}"
          .fire="${this.charAttributes.fire}"
          .walking="${this.charAttributes.walking}"
          .circle="${this.charAttributes.circle}"
          ></rpg-character>
      </div>
  <div class="controls-container">
    <wired-input
    name="accessories"
    type="number"
    min="0"
    max="9"
    placeholder="Accessories"
    @change="${this.handleInputChange}"
    ></wired-input>

    <wired-input
    name="base"
    type="number"
    min="1"
    max="9"
    placeholder="Base"
    @change="${this.handleInputChange}"
    ></wired-input>
  </div>
  <h3><span>${this.t.title}:</span> ${this.title}</h3>
  <slot></slot>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(Project2a.tag, Project2a);