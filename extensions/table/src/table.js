import select from '../../_utils/select';
import wrap from '../../_utils/wrap';
import toArray from '../../_utils/toArray';
import debounce from '../../_utils/debounce';

import Sortable from './sortable';
import Paginator from './paginator';

class Table {
  static defaults = {
    fixedHeader: false,
    pagination: true,
    sortable: true,
    editable: false,
    density: false,
    perPage: 10
  }
  constructor(el, settings) {
    this.el = select(el);
    this.settings = {
      ...Table.defaults,
      ...settings
    }
    this.init();
  }

  /**
   * init all table extensions
   */
  init() {
    this.paginator = new Paginator(this.el, {
      perPage: this.settings.perPage,
      editable: this.settings.editable
    });
    this.sortable = new Sortable(this.el, this.paginator);
    this.scroll = window.scrollY;
    this.initWrapper();
    if (this.settings.pagination) this.initPagination();
    if (this.settings.sortable) this.initSortable();
    if (this.settings.density) this.initDensity();
    if (this.settings.fixedHeader) this.initFixedHeader();
  }

  /**
   * add wrapper around the table
   */
  initWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('table-wrapper');
    wrap(this.el, this.wrapper);
  }

  /**
   * init fixed header when scroll
   */
  initFixedHeader() {
    this.header = this.el.querySelector('thead');
    this.ticking = false;
    this.updateHeaderSize();
    window.addEventListener('scroll', () => {
      this.scroll = window.scrollY;
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.updateHeaderState();
          this.ticking = false;
        });
      }
      this.ticking = true;
    }, {
      passive: true
    });
    window.addEventListener('resize',
      debounce(this.updateHeaderSize.bind(this)),
      { passive: true }
    );
  }

  /**
   * init ability to sort table elements
   */
  initSortable() {
    this.lastSort = '';
    this.headers = toArray(this.el.querySelectorAll('thead th'));
    this.titles = this.headers.map((header) => header.innerHTML.toLowerCase());
    this.sortButtons = [];
    this.headers.forEach((header) => {
      header.insertAdjacentHTML('beforeend',
        `<button class="table-sort">
          <svg viewBox="0 0 24 24" class="icon">
            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
          </svg>
        </button>`
      );
      this.sortButtons.push(header.querySelector('button'));
    });

    this.sortButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        let direction = this.lastSort.button === button
          ? this.lastSort.dir === 'asc' ? 'desc' : 'asc'
          : 'asc';
        this.lastSort = {
          button: button,
          dir: direction
        };
        this.sortable.sortBy(this.titles[index].toString(), direction);
        this.sortButtons.forEach((btn) => {
          btn.classList.remove('is-active', 'is-desc');
        });
        button.classList.add('is-active');
        if (direction === 'desc') button.classList.add('is-desc');
      });
    });
  }

  /**
   * init table pagination
   */
  initPagination() {
    this.pagination = {};
    this.pagination.row = document.createElement('nav');
    this.pagination.row.classList.add('pagination');

    for (let pageNumber = 1; pageNumber <= this.paginator.totalPageCount; pageNumber++) {
      const callback = () => {
        this.paginator.jumpToPage(pageNumber);
        this.updateHeaderSize();
      }
      const button = document.createElement('button');
      button.classList.add('pagination-item');
      button.innerText = pageNumber;
      button.addEventListener('click', callback);
      this.pagination.row.appendChild(button);
    }

    this.pagination.row.insertAdjacentHTML('afterbegin', `
      <button class="pagination-prev">
        <svg viewBox="0 0 24 24" class="icon">
          <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
        </svg>
      </button>
    `);
    this.pagination.row.insertAdjacentHTML('beforeend', `
      <button class="pagination-next">
        <svg viewBox="0 0 24 24" class="icon">
          <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
        </svg>
      </button>
    `);

    this.wrapper.appendChild(this.pagination.row);

    this.pagination.previous = this.wrapper.querySelector('.pagination-prev');
    this.pagination.next = this.wrapper.querySelector('.pagination-next');

    this.pagination.previous.addEventListener('click', () => {
      this.paginator.previousPage();
      this.updateHeaderSize();
    });
    this.pagination.next.addEventListener('click', () => {
      this.paginator.nextPage();
      this.updateHeaderSize();
    });
  }

  /**
   * init display density
   */
  initDensity() {
    this.density = {};
    this.wrapper.insertAdjacentHTML('afterbegin', `
      <div class="density">
        <button class="density-small button is-inverse is-tiny">
          <svg viewBox="0 0 24 24" class="icon">
            <path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"/>
          </svg>
        </button>
        <button class="density-medium button is-inverse is-tiny is-active">
          <svg viewBox="0 0 24 24" class="icon">
            <path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"/>
          </svg>
        </button>
        <button class="density-large button is-inverse is-tiny">
          <svg viewBox="0 0 24 24" class="icon">
            <path d="M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"/>
          </svg>
        </button>
      </div>
    `);

    this.density.small = this.wrapper.querySelector('.density-small');
    this.density.medium = this.wrapper.querySelector('.density-medium');
    this.density.large = this.wrapper.querySelector('.density-large');
    this.density.small.addEventListener('click', () => this.applyDensity('small'));
    this.density.medium.addEventListener('click', () => this.applyDensity('medium'));
    this.density.large.addEventListener('click', () => this.applyDensity('large'));
  }

  applyDensity(density) {
    Object.keys(this.density).forEach((key) => {
      this.density[key].classList.remove('is-active');
    });
    this.density[density].classList.add('is-active');
    this.el.classList.remove('is-large', 'is-medium', 'is-small');
    this.el.classList.add(`is-${density}`);
    if (this.settings.fixedHeader) {
      this.updateHeaderSize();
      this.updateHeaderState();
    }
  }
  /**
   * update header position
   */
  updateHeaderState() {
    this.header.style.willChange = 'transform';
    const headerPosition = this.scroll - this.tableTop;
    if (this.scroll >= this.tableBottom - this.headerHeight) {
      return;
    }
    if (this.scroll >= this.tableTop) {
      this.header.style.transform = `translate3d(0, ${headerPosition}px, 0)`;
      return;
    }
    this.header.style.willChange = '';
    this.header.style.transform = `translate3d(0, 0, 0)`;
  }

  /**
   * update header size
   */
  updateHeaderSize() {
    this.tableTop = this.el.getBoundingClientRect().top + window.scrollY;
    this.tableBottom = this.el.getBoundingClientRect().bottom + window.scrollY;
    this.headerHeight = this.header.getBoundingClientRect().height;
  }
}

export default Table;
