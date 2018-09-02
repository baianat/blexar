import select from '../../_utils/select';
import show from '../../_utils/show';
import hide from '../../_utils/hide';

/**
 * modal class
 */
export default class Modal {
  constructor(selector, button) {
    this.el = select(selector);
    this.button = select(button);
    this.init();
  }

  static create() {
    Array.from(document.querySelectorAll('[data-base-modal]')).forEach((button) => {
      new Modal(document.querySelector(button.dataset.baseModal), button);
    });
  }

  init() {
    this.panel = this.el.querySelector('.modal-panel');
    this.dismiss = this.el.querySelector('.modal-dismiss');
    this.animating = false;

    this.initEvents();
    hide(this.el);
  }

  initEvents() {
    this.button.addEventListener('click', () => show(this.el), false);
    this.dismiss.addEventListener('click', () => hide(this.el), false);

    this.el.addEventListener('click', (event) => {
      if (event.target === this.el) hide(this.el);
    }, false);
  }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  Modal.create();
}
