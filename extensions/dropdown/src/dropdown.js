import select from '../../_utils/select';
import isElementClosest from '../../_utils/isElementClosest';

/**
 * modal class
 */
export default class Dropdown {
  constructor (selector, menu = null, {
    menuVisible = 'is-visible',
    menuHidden = 'is-hidden',
    elementActive = 'is-active',
    hideWhenClickOut = false
  } = {}) {
    this.el = select(selector);
    this.menu = select(menu);
    this.settings = {
      menuVisible,
      menuHidden,
      elementActive,
      hideWhenClickOut
    };
    this.init();
  }

  static create () {
    Array.from(document.querySelectorAll('[data-base-dropdown]')).forEach((el) => {
      new Dropdown(el, document.querySelector(el.dataset.baseDropdown)); // eslint-disable-line
    });
  }

  /**
   * add event listeners to the modal elements
   * @param {HTMLElement} button
   * @param {HTMLElement} element
   */
  init () {
    this.hide();
    this.initEvents();
  }

  initEvents () {
    this.el.addEventListener('click', this.toggleVisibility.bind(this));
  }

  toggleVisibility (event) {
    if (this.isVisible && !isElementClosest(event.target, this.menu)) {
      this.hide();
      return;
    }
    this.show(event);
  }

  show (event) {
    this.isVisible = true;
    this.menu.classList.add(this.settings.menuVisible);
    this.menu.classList.remove(this.settings.menuHidden);
    this.menu.setAttribute('aria-hidden', 'false');
    this.el.classList.add(this.settings.elementActive);

    if (this.settings.hideWhenClickOut) {
      this.tempHandler = this.whenClickOut.bind(this);
      document.addEventListener('click', this.tempHandler);
    }
  }

  hide () {
    this.isVisible = false;
    this.menu.classList.remove(this.settings.menuVisible);
    this.menu.classList.add(this.settings.menuHidden);
    this.menu.setAttribute('aria-hidden', 'true');
    this.el.classList.remove(this.settings.elementActive);

    document.removeEventListener('click', this.tempHandler);
  }

  whenClickOut (event) {
    if (!isElementClosest(event.target, this.el) &&
      !isElementClosest(event.target, this.menu)
    ) {
      this.hide();
    }
  }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  Dropdown.create();
}
