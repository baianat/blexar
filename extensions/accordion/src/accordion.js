import async from '../../_utils/async';
import select from '../../_utils/select';

/**
 * accordion class
 */
export default class Accordion {
  static defaults = {
    autoClose: true
  }

  constructor(selector, settings) {
    this.el = select(selector);
    this.settings = {
      ...Accordion.defaults,
      ...settings
    }
    this.init();
  }

  /**
   * create new rang accordion from element
   */
  init() {
    this.items = Array.from(this.el.querySelectorAll(':scope >.accordion-item'));
    this.activeItems = this.items.filter(item => item.classList.contains('is-active'));
    this.titles = this.items.map(item => item.querySelector('.accordion-title'));
    this.titles.forEach((title) => {
      title.addEventListener('click', () => this.update(title), false);
    });
  }

  /**
   * update accordion states
   * @param {HTMLElement} title
   */
  update(title) {
    const item = title.parentNode;
    if (this.activeItems.includes(item)) {
      this.collapse(item);
      return;
    }
    this.expand(item);
  }

  /**
   * collapse the open panel
   * @param {HTMLElement} item
   */
  collapse(item) {
    this.activeItems.splice(this.activeItems.indexOf(item), 1);
    const body = item.querySelector('.accordion-body');
    body.style.height = `${body.clientHeight}px`;
    async(() => {
      body.style.height = '';
      item.classList.remove('is-active');
    });
  }

  /**
   * expand the close panel
   * @param {HTMLElement} item
   */
  expand(item) {
    if (this.settings.autoClose) {
      const temp = this.activeItems.slice(0);
      temp.forEach(item => this.collapse(item));
    }
    this.activeItems.push(item);
    const body = item.querySelector('.accordion-body');
    item.classList.add('is-active');
    const bodyHeight = body.clientHeight;
    body.style.height = 0;
    body.addEventListener('transitionend', () => body.style.height = '');
    async(() => {
      body.style.height = `${bodyHeight}px`;
    })
  }
}
