import select from '../../_utils/select';

class Sortable {
  constructor(el, paginator, {
    paginate = true
  } = {}) {

    this.el = select(el);
    this.settings = {
      paginate
    };
    this.paginator = paginator;
    this.init();
  }

  /**
   * initializes the table
   */
  init() {
    if (this.settings.paginate) {
      this.paginator.render();
    }
  }

  /**
   * sorts by a specific column.
   */
  sortBy(property, order = 'asc') {
    const desiredOrder = order.toLowerCase();
    this.paginator.items.sort((a, b) => {
      if (a[property] > b[property]) {
        return desiredOrder === 'asc' ? 1 : -1;
      }

      if (a[property] < b[property]) {
        return desiredOrder === 'asc' ? -1 : 1;
      }

      return 0;
    });

    this.paginator.render();
  }
}

export default Sortable;
