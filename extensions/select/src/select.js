import Dropdown from '../../dropdown/src/dropdown';
import select from '../../_utils/select';
import debounce from '../../_utils/debounce';

class Select {
  constructor (selector, {
    data = null,
    multiple = false
  } = {}) {
    this.el = select(selector);
    this.settings = {
      data,
      multiple
    }
    this.init();
  }

  get value () {
    if (this.settings.multiple) {
      return this.results.map((opt) => opt.value);
    }
    return this.el.value;
  }

  init () {
    this._initSelect();
    this._initData();
    this._initMenu();
    this._initEvents();
  }

  _initSelect () {
    this.select = document.createElement('div');
    this.input = document.createElement('input');

    const currentClasses = this.el.classList ? Array.from(this.el.classList) : [''];
    this.select.classList.add('select', ...currentClasses);
    this.input.classList.add('select-input');
    this.el.classList.add('is-hidden');

    this.el.parentNode.insertBefore(this.select, this.el);
    this.select.appendChild(this.el);
    this.select.appendChild(this.input);
    if (this.settings.multiple || this.el.multiple) {
      this.settings.multiple = true;
      this.results = [];
      this.labels = document.createElement('div');
      this.labels.classList.add('select-labels');
      this.select.appendChild(this.labels);
      this.el.multiple = true;
    }
    if (this.settings.data !== null) {
      this._generateSelectFromData();
    }
  }

  _initData () {
    if (this.settings.data !== null) {
      this.data = this.settings.data;
      return;
    }
    const optionsGroup = Array.from(this.el.querySelectorAll('optgroup'));
    const options = Array.from(this.el.querySelectorAll(':scope >option'));
    this.data = optionsGroup.map(group => {
      const groupData = { text: group.label };
      const options = Array.from(group.querySelectorAll(':scope >option'));
      groupData.children = options.map(option => {
        return {
          text: option.innerHTML,
          value: option.value
        }
      });
      return groupData;
    });
    this.data = this.data.concat(options.map(option => {
      return {
        text: option.innerHTML,
        value: option.value
      }
    }));
  }

  _initMenu () {
    this.isMenuVisible = false;
    this.options = [];
    this.menu = document.createElement('div');
    this.list = document.createElement('ul');

    this.menu.classList.add('select-menu');
    this.list.classList.add('select-list');

    // generate options based on data object
    let id = 0;
    this.data.forEach(el => {
      const item = document.createElement('li');
      item.classList.add('select-item');
      this.list.appendChild(item);
      if (el.children) {
        const childTitle = document.createElement('label');
        const childMenu = document.createElement('ul');
        childTitle.classList.add('select-childTitle');
        childMenu.classList.add('select-childMenu');
        item.classList.add('is-group');
        item.appendChild(childTitle);
        item.appendChild(childMenu);

        childTitle.innerText = el.text;
        el.children.forEach((child) => {
          const childItem = document.createElement('li');
          childItem.classList.add('select-childItem');
          childMenu.appendChild(childItem);
          childItem.innerText = child.text;
          this.options.push({
            element: childItem,
            id: id++,
            text: child.text,
            value: child.value
          });
        });
        return;
      }
      item.innerText = el.text;
      this.options.push({
        element: item,
        id: id++,
        text: el.text,
        value: el.value
      });
    });
    this.menu.appendChild(this.list);
    this.select.appendChild(this.menu);
    if (~this.el.selectedIndex) {
      this.selectOption(this.options.find(opt => opt.id === this.el.selectedIndex));
    }
    this.dropdown = new Dropdown(this.select, this.menu, {
      hideWhenClickOut: true
    });
  }

  _initEvents () {
    this.options.forEach(option => {
      option.element.addEventListener('click', () => {
        this.selectOption(option);
      })
    });
    this.input.addEventListener('input', () => {
      const filter = this.input.value.toUpperCase();
      this.options.forEach(option => {
        if (option.text.toUpperCase().indexOf(filter) === -1) {
          option.element.style.display = 'none';
          return;
        }
        option.element.style.display = '';
      });
    });
    if (this.settings.multiple) {
      window.addEventListener('resize', debounce(this.updateSelectSize.bind(this)));
    }
  }

  _generateSelectFromData () {
    const frag = document.createDocumentFragment();
    this.settings.data.forEach(option => {
      if (option.children) {
        const group = document.createElement('optgroup');
        group.label = option.text;
        option.children.forEach(child => {
          const option = document.createElement('option');
          option.innerText = child.text;
          option.value = child.value;
          group.appendChild(option);
        });
        this.option.appendChild(group);
        return;
      }
      const optionElement = document.createElement('option');
      optionElement.innerText = option.text;
      optionElement.value = option.value;
      frag.appendChild(optionElement);
    });
    this.el.appendChild(frag);
  }

  selectOption (option) {
    // if (!option || this.el.selectedIndex === option.id) return;
    if (this.settings.multiple) {
      this.updateResults(option, this.el.item(option.id).selected);
      this.updateLabels();
      this.el.dispatchEvent(new Event('change')); // eslint-disable-line
      return;
    }
    this.options.forEach((opt) => {
      opt.element.classList.remove('is-selected');
    })
    option.element.classList.add('is-selected');
    this.el.selectedIndex = option.id;
    this.input.value = this.el[this.el.selectedIndex].innerText;
    this.el.dispatchEvent(new Event('change')); // eslint-disable-line
  }

  updateLabels () {
    this.labels.innerHTML = '';
    this.results.forEach((result) => {
      const label = `
      <div class="select-label">
        <span>${result.text}</span>
        <a class="select-labelDismiss" id="close-${result.id}">
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </a>
      </div>`
      this.labels.insertAdjacentHTML('beforeEnd', label);
      this.updateSelectSize();
      const close = this.labels.querySelector(`#close-${result.id}`);
      close.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.updateResults(result, true);
        this.updateLabels();
      });
    });
  }

  updateSelectSize () {
    let labels = this.labels.offsetHeight;
    if (labels === 0) return;
    let border = window.getComputedStyle(this.select, null).getPropertyValue('border-width');
    let borders = Number(border.slice(0, -2)) * 2;
    this.select.style.height = `${labels + borders}px`;
  }
  updateResults (result, remove) {
    if (remove) {
      this.el.item(result.id).selected = false;
      this.results.splice(this.results.indexOf(result), 1);
      result.element.classList.remove('is-selected');
      return;
    }
    this.el.item(result.id).selected = true;
    this.results.push(result);
    result.element.classList.add('is-selected');
  }
}

export default Select;
