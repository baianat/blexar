import select from '../../_utils/select';
import debounce from '../../_utils/debounce';
import Dropdown from '../../dropdown/src/dropdown';

class Navbar {
  static defaults = {
    breakpoint: 500,
    hideMenuTolerance: 10
  };

  constructor (el, settings) {
    this.el = select(el);
    this.settings = {
      ...Navbar.defaults,
      ...settings
    };
    this.init();
  }

  init () {
    this.wrapper = this.el.querySelector('[data-nav-items]');
    this.menu = this.el.querySelector('[data-nav-menu]');
    this.dropdownEl = this.el.querySelector('[data-nav-dropdown]');
    this.items = Array.from(this.wrapper.children);
    this.menuItems = [];
    this.navbarItems = this.getPriorityOrder();
    this.lastWindowSize = window.innerWidth;
    this.lastWindowScroll = window.scrollY;
    this.initEvents();
    this.initDropdowns();
    this.updateMenu();
  }

  initDropdowns () {
    this.dropdown = new Dropdown(
      this.dropdownEl,
      this.dropdownEl.querySelector('.dropdown-menu'),
      { hideWhenClickOut: true }
    );
    this.dropdowns = Array.from(this.wrapper.querySelectorAll('.dropdown'));
    this.dropdowns = this.dropdowns.map((dropdown) => {
      return new Dropdown(
        dropdown,
        dropdown.querySelector('.dropdown-menu'),
        { hideWhenClickOut: true }
      ); // eslint-disable-line
    });
  }

  initEvents () {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(this.updateMenu.bind(this), 100);
    });
    window.addEventListener('resize', debounce((event) => {
      this.updateMenu();
    }), {
      passive: true
    });
    window.addEventListener('scroll', debounce((event) => {
      this.updateFixed();
    }), {
      passive: true
    });
  }

  updateFixed () {
    const currentScroll = window.scrollY;
    const mode = this.lastWindowScroll < currentScroll ? 'down' : 'up';
    const tolerance = currentScroll - this.lastWindowScroll > this.settings.hideMenuTolerance;

    if (mode === 'down' && tolerance) {
      this.el.classList.add('is-hidden');
      this.dropdowns.forEach(dropdown => dropdown.hide());
      this.dropdown.hide();
    }

    if (mode === 'up') {
      this.el.classList.remove('is-hidden');
    }
    this.lastWindowScroll = currentScroll;
  }

  getPriorityOrder () {
    let lowPriority = [];
    let mediumPriority = [];
    let highPriority = [];

    this.items.forEach((item) => {
      let priority = item.dataset.navPriority;
      if (!priority) lowPriority.push(item);
      if (priority === 'low') lowPriority.push(item);
      if (priority === 'medium') mediumPriority.push(item);
      if (priority === 'high') highPriority.push(item);
    });

    return lowPriority.concat(mediumPriority, highPriority);
  }

  isContained () {
    let itemsWidth = 0;
    let wrapperWidth = this.wrapper.clientWidth;

    this.navbarItems.forEach((item) => {
      itemsWidth += item.clientWidth;
    });

    return wrapperWidth >= itemsWidth;
  }

  isMinimizing () {
    return this.lastWindowSize >= window.innerWidth;
  }

  getBeforeElementIndex (item) {
    const itemIndex = this.items.indexOf(item);
    const maxElements = this.items.length - 1;
    let outputIndex = itemIndex + 1;
    while (outputIndex <= maxElements) {
      if (this.items[outputIndex].parentNode === this.wrapper) {
        return outputIndex;
      }
      outputIndex++;
    }
    return false;
  }

  moveToMenu () {
    const item = this.navbarItems.shift();
    item.classList.remove('navbar-item');
    item.classList.add('dropdown-item');
    this.menuItems.push(item);
    this.menu.appendChild(item);
  }

  moveToNavbar () {
    const item = this.menuItems.pop();
    item.classList.remove('dropdown-item');
    item.classList.add('navbar-item');
    this.navbarItems.unshift(item);
    
    const beforeIndex = this.getBeforeElementIndex(item);
    if (beforeIndex) {
      this.wrapper.insertBefore(item, this.items[beforeIndex]);
      return;
    }
    this.wrapper.appendChild(item);
  }

  updateMenu () {
    if (window.matchMedia(`(max-width: ${this.settings.breakpoint}px)`).matches) {
      const length = this.navbarItems.length;
      for (let index = 0; index < length; index++) {
        this.moveToMenu();
      }
      return;
    }

    const minimizing = this.isMinimizing();

    if (!this.isContained() && minimizing) {
      this.moveToMenu();
    }

    if (!minimizing && !!this.menuItems.length) {
      this.moveToNavbar();
    }

    this.lastWindowSize = window.innerWidth;

    if (!this.isContained()) {
      this.updateMenu();
    }

    if (!this.menuItems.length) {
      this.dropdown.el.style.display = 'none';
      this.dropdown.hide();
    }

    if (this.menuItems.length) {
      this.dropdown.el.style.display = '';
    }
  }
}

export default Navbar;
