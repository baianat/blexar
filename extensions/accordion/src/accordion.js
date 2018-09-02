import async from '../../_utils/async';
import select from '../../_utils/select';

/**
 * accordion class
 */
export default class Accordion {
  constructor(selector) {
    this.el = select(selector);
    this.init();
  }

  /**
   * create new rang accordion from element
   */
  init() {
    this.activeItems = Array.from(this.el.querySelectorAll('.accordion-item.is-active'));
    this.titles = Array.from(this.el.querySelectorAll(':scope >.accordion-item >.accordion-title'));
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
    body.style.height = `${body.scrollHeight}px`;
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
    this.activeItems.push(item);
    const body = item.querySelector('.accordion-body');
    item.classList.add('is-active');
    const bodyHeight = body.scrollHeight;
    body.style.height = 0;
    async(() => {
      body.style.height = `${bodyHeight}px`;
    })
    body.addEventListener('transitionend', () => { body.style.height = '' });
  }

  /**
   *  automatically create all accordions in the page
   */
  static create() {
    const accordions = Array.from(document.querySelectorAll('.accordion'));
    accordions.forEach((accordion) => {
      new Accordion(accordion); // eslint-disable-line
    });
  }
}
