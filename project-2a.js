/**
 * Copyright 2024 Christina & Eglicky
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "wired-elements";
import "@haxtheweb/rpg-character/rpg-character.js";

/**
 * `project-2a`
 * A character editor tool combining functionality and design elements.
 * @demo index.html
 * @element project-2a
 */
export class Project2a extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "project-2a";
  }

  constructor() {
    super();
    this.title = "Design Your Character";
    this.characterSettings = {
      seed: "00000000",
      base: 0,
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      glasses: false,
      hatColor: 0,
      size: 200,
      name: "",
      fire: false,
      walking: false,
      leg: 0
    };
    this._applySeedToSettings();
  }

  static get properties() {
    return {
      ...super.properties,
      characterSettings: { type: Object },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
        }
        .container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          align-items: flex-start;
          padding: 20px;
        }
        .character-preview {
          flex: 1;
          min-width: 300px;
          text-align: center;
          position: relative;
        }
        .character-preview rpg-character {
          height: var(--character-size, 200px);
          width: var(--character-size, 200px);
          transition: height 0.3s ease, width 0.3s ease;
        }
        .controls {
          flex: 1;
          min-width: 300px;
          text-align: left;
        }
        wired-input{
          opacity: 1;
        }
        wired-checkbox,
        wired-slider {
          display: block;
          margin-bottom: 2px;
          max-width: 300px;
        }
        label {
          display: block;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        button {
          margin-top: 10px;
          padding: 10px 20px;
          cursor: pointer;
          background-color: #007bff;
          color: white;
          border: 1px solid #0056b3;
          border-radius: 4px;
          font-size: 16px;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        button:hover {
          background-color: #0056b3;
          border-color: #004085;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="container">
        <div class="character-preview">
          <rpg-character
            base="${this.characterSettings.base}"
            face="${this.characterSettings.face}"
            faceitem="${this.characterSettings.faceitem}"
            hair="${this.characterSettings.hair}"
            pants="${this.characterSettings.pants}"
            shirt="${this.characterSettings.shirt}"
            skin="${this.characterSettings.skin}"
            hatColor="${this.characterSettings.hatColor}"
            .fire="${this.characterSettings.fire}"
            .walking="${this.characterSettings.walking}"
            style="
              --character-size: ${this.characterSettings.size}px;
              --hat-color: hsl(${this.characterSettings.hatColor}, 100%, 50%);
            "
          ></rpg-character>
        </div>
        <div class="controls">
          <label for="characterNameInput">Character Name:</label>
          <wired-input
            id="characterNameInput"
            type="text"
            placeholder="Enter character name"
            @input="${(e) => this._updateSetting('name', e.target.value)}"
          ></wired-input>
          

          <label for="size">Character Size:</label>
          <wired-slider
            id="size"
            value="${this.characterSettings.size}"
            min="100"
            max="500"
            @change="${(e) =>
              this._updateSetting('size', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="face">Face:</label>
          <wired-slider
            id="face"
            value="${this.characterSettings.face}"
            min="0"
            max="5"
            @change="${(e) =>
              this._updateSetting('face', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="faceitem">Face Item:</label>
          <wired-slider
            id="faceitem"
            value="${this.characterSettings.faceitem}"
            min="0"
            max="9"
            @change="${(e) =>
              this._updateSetting('faceitem', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="hatColor">Hat Color:</label>
          <wired-slider
            id="hatColor"
            value="${this.characterSettings.hatColor}"
            min="0"
            max="9"
            @change="${(e) =>
              this._updateSetting('hatColor', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="hair">Hair:</label>
          <wired-slider
            id="hair"
            value="${this.characterSettings.hair}"
            min="0"
            max="9"
            @change="${(e) =>
              this._updateSetting('hair', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="shirt">Shirt:</label>
          <wired-slider
            id="shirt"
            value="${this.characterSettings.shirt}"
            min="0"
            max="9"
            @change="${(e) =>
              this._updateSetting('shirt', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="pants">Pants:</label>
          <wired-slider
            id="pants"
            value="${this.characterSettings.pants}"
            min="0"
            max="9"
            @change="${(e) =>
              this._updateSetting('pants', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="skin">Skin:</label>
          <wired-slider
            id="skin"
            value="${this.characterSettings.skin}"
            min="0"
            max="9"
            @change="${(e) =>
              this._updateSetting('skin', parseInt(e.detail.value))}"
          ></wired-slider>

          <wired-checkbox
          id="hairToggle"
          ?checked="${this.characterSettings.base === 1}"
          @change="${(e) =>
            this._updateSetting('base', e.target.checked ? 1 : 0)}"
          >Has Hair</wired-checkbox>

          <wired-checkbox
          ?checked="${this.characterSettings.fire}"
          @change="${(e) => this._updateSetting('fire', e.target.checked)}"
          >On Fire</wired-checkbox>

          <wired-checkbox
          .checked="${this.characterSettings.walking}"
          @change="${(e) => this._updateSetting('walking', e.target.checked)}"
          > Walking </wired-checkbox>

          <button @click="${this._generateShareLink}">Share</button>
          <p id="share-link"></p>

        </div>
      </div>
    `;
  }

  _generateSeed() {
    const {
      base,
      face,
      faceitem,
      hair,
      pants,
      shirt,
      skin,
      hatColor,
    } = this.characterSettings;

    const seedArray = [
      base,
      face,
      faceitem,
      hair,
      pants,
      shirt,
      skin,
      hatColor,
    ];

    return seedArray.map((val) => val.toString().padStart(1, "0")).join("").padEnd(8, "0");
  }

  _applySeedToSettings() {
    const seed = this.characterSettings.seed;
    const paddedSeed = seed.padStart(8, "0").slice(0, 8);
    const values = paddedSeed.split("").map((v) => parseInt(v, 10));

    [
      this.characterSettings.base,
      this.characterSettings.face,
      this.characterSettings.faceitem,
      this.characterSettings.hair,
      this.characterSettings.pants,
      this.characterSettings.shirt,
      this.characterSettings.skin,
      this.characterSettings.hatColor,
    ] = values;

    this.requestUpdate();
  }

  _initializeFromURL() {
    const params = new URLSearchParams(window.location.search);
    this.characterSettings.seed = params.get("seed") || this.characterSettings.seed;
    this._applySeedToSettings();
  }

  _updateSetting(key, value) {
    this.characterSettings[key] = value;
    this.characterSettings.seed = this._generateSeed();
    this._applySeedToSettings();
    this._updateURL();
  }

  _updateURL() {
    const params = new URLSearchParams(window.location.search);
    params.set("seed", this.characterSettings.seed);
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
  }

  _generateShareLink() {
    const url = `${window.location.origin}${window.location.pathname}?seed=${this.characterSettings.seed}`;
    navigator.clipboard.writeText(url).then(() => alert("Link copied!"));
  }
}

globalThis.customElements.define(Project2a.tag, Project2a);
