import select from '../../_utils/select';
import toArray from '../../_utils/toArray';

export default class Paginator {
  constructor(el, settings = {}) {
    this.el = select(el);
    this.settings = settings;
    this.init();
  }

  /**
   * init paginator
   */
  init() {
    this.currentPage = 1;
    this.items = this._normalizeTableData();;
    this.allItems = [];
    this._chunk(this.settings.perPage);
  }

  /**
   * return number of pages in table
   */  
  get totalPageCount() {
    return this.allItems.length;
  }

  /**
   * Renders the in-memory changes done to a table.
   */
  render() {
    const fragment = document.createDocumentFragment();
    this.items.forEach((item) => {
      const row = document.createElement('tr');
      this.columns.forEach((key) => {
        const cell = document.createElement('td');
        cell.innerText = item[key];
        row.appendChild(cell);
        if (this.settings.editable) {
          cell.addEventListener('click', () => this.edit(item.id, key));
        }
      });
      row.addEventListener('getId', () => { 
        return item;
      }, false);
      fragment.appendChild(row);
    });

    this.el.tBodies[0].innerHTML = '';
    this.el.tBodies[0].appendChild(fragment);
  }

  /**
   * update table with next items
   */  
  nextPage() {
    this.paginateTo(this.currentPage + 1);
    this.render();
  }

  /**
   * update table with previous items
   */
  previousPage() {
    this.paginateTo(this.currentPage - 1);
    this.render();
  }

  /**
   * go to specific page
   */
  jumpToPage(page) {
    this.paginateTo(page);
    this.render();
  }

  updateEvents() {
    this.afterEdit = new CustomEvent('afterEdit', {
      detail: {
        column: this.cell.column,
        row: this.cell.row,
        value: this.cell.value
      }
    });
    this.beforeEdit = new CustomEvent('beforeEdit', {
      detail: {
        column: this.cell.column,
        row: this.cell.row
      }
    })
  }

  /**
   * Jumps to a specific page.
   */
  paginateTo(page) {
    if (this.totalPageCount < page || page <= 0) {
      return;
    }
    this.currentPage = page;
    this.items = this.allItems[page - 1];

    return this.items;
  }


  /**
   * add input in table cell with it's value
   * @param {Event} event 
   */
  edit(row, column) {
    this.cell = {}
    this.cell.row = row;
    this.cell.column = column;
    this.updateEvents();
    this.el.dispatchEvent(this.beforeEdit);

    const cell = event.target;
    const input = document.createElement('input');
    const data = cell.innerText;
    input.classList.add('input', 'is-tiny', 'no-marginBottom');
    input.value = data;
    cell.innerText = '';
    cell.appendChild(input);
    input.focus();
    input.addEventListener('blur', this.removeInput.bind(this, input, row, column));
  }

  /**
   * remove the input and update the cell with value
   * @param {Element} input 
   * @param {Node} cell 
   */
  removeInput(input, row, column) {
    this.cell.value = input.value;
    const flatItems = this.allItems.reduce((a, b) => a.concat(b), []);
    const findRow = (item) => item.id === row;
    const currentRaw = flatItems.find(findRow);
    currentRaw[column] = this.cell.value;
    this.render();
    this.updateEvents();    
    this.el.dispatchEvent(this.afterEdit);
  }

  /**
   * Chunks the items into groups containing a specific number of items.
   */
  _chunk(count) {
    // No Pagination required.
    if (count <= 0) {
      this.allItems = this.items;
      return;
    }

    const length = this.items.length;
    for (let i = 0; i < length; i += count) {
      this.allItems.push(this.items.slice(i, i + count));
    }

    this.items = this.allItems[0];
  }

  /**
   * Converts table columns and rows into objects.
   */
  _normalizeTableData() {
    const rows = toArray(this.el.tBodies[0].rows);
    if (this.el.tHead) {
      this.columns = toArray(this.el.tHead.rows[0].cells);
    } else {
      this.columns = toArray(rows[0].cells);
    }
    this.columns = this.columns.map((cell) => cell.innerText.toLowerCase());
    return rows.map((row, index) => {
      const rowData = { id: index };
      toArray(row.cells).forEach((cell, index) => {
        rowData[this.columns[index]] = cell.innerText;
      });
      return rowData;
    });
  }
}