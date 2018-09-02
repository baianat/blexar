import select from '../../_utils/select';
import debounce from '../../_utils/debounce';
import Dropdown from '../../dropdown/src/dropdown';

class Navbar {
  constructor (el, {
    breakpoint = 320,
    hideMenuTolerance = 10
  } = {}) {
    this.el = select(el);
    this.init();
    this.settings = {
      breakpoint,
      hideMenuTolerance
    };
  }

  init () {
    this.wrapper = this.el.querySelector('[data-nav-items]');
    this.items = Array.from(this.wrapper.children);
    this.menu = this.el.querySelector('[data-nav-menu]');
    this.button = this.el.querySelector('[data-nav-button]');
    this.menuItems = [];
    this.navbarItems = this.getPriorityOrder();
    this.lastWindowSize = window.innerWidth;
    this.lastWindowScroll = window.scrollY;
    this.initEvents();
    this.initDropdowns();
    this.updateMenu();
  }

  initDropdowns () {
    this.dropdowns = Array.from(this.el.querySelectorAll('.dropdown'));
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
    }));
    window.addEventListener('scroll', debounce((event) => {
      this.updateFixed();
    }, true));
  }

  updateFixed () {
    const currentScroll = window.scrollY;
    const mode = this.lastWindowScroll < currentScroll ? 'down' : 'up';
    const tolerance = currentScroll - this.lastWindowScroll > this.settings.hideMenuTolerance;

    if (mode === 'down' && tolerance) {
      this.el.classList.add('is-hidden');
      this.dropdowns.forEach(dropdown => dropdown.hide());
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

  updateMenu () {
    if (!this.isContained() && this.isMinimizing()) {
      let item = this.navbarItems.splice(0, 1)[0];
      this.menuItems.push(item);
      this.menu.appendChild(item);
    }

    if (!this.isMinimizing() && !!this.menuItems.length) {
      let item = this.menuItems.splice(this.menuItems.length - 1, 1)[0];
      let itemIndex = this.items.indexOf(item);
      this.wrapper.insertBefore(item, this.items[itemIndex + 1]);
      this.navbarItems.unshift(item);
      this.updateMenu();
    }

    this.lastWindowSize = window.innerWidth;
    if (!this.isContained()) this.updateMenu();

    this.button.disabled = !this.menuItems;
  }
}

export default Navbar;
