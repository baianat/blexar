import select from '../../_utils/select';
import isElementClosest from '../../_utils/isElementClosest';

/**
 * modal class
 */
export default class Dropdown {
  static defaults = {
    menuVisible: 'is-visible',
    menuHidden: 'is-hidden',
    elementActive: 'is-active',
    hideWhenClickOut: false
  } 
  constructor (selector, menu = null, settings) {
    this.el = select(selector);
    this.menu = select(menu);
    this.settings = {
      ...Dropdown.defaults,
      ...settings
    };
    this.init();
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

  show () {
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

