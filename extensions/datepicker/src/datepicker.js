import select from '../../_utils/select'
import Dropdown from '../../dropdown/src/dropdown';
import {
  endOfMonth,
  startOfMonth,
  getYear,
  getMonth,
  format,
  parse,
  addMonths
} from 'date-fns/esm';

class Datepicker {
  static defaults = {
    dateFormat: 'dd/MM/yyyy',
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  constructor (el, settings) {
    this.el = select(el);
    this.settings = {
      ...Datepicker.defaults,
      ...settings
    };
    this.init();
  }

  init () {
    this.currentDate = new Date();

    // create datepicker wrapper
    this.wrapper = document.createElement('div');
    this.dropdownMenu = document.createElement('div');
    this.datepickerControl = document.createElement('div');
    this.table = document.createElement('table');
    this.yearSelector = document.createElement('input');
    this.monthSelector = document.createElement('select');

    this.wrapper.classList.add('dropdown');
    this.dropdownMenu.classList.add('dropdown-menu');
    this.datepickerControl.classList.add('datepicker-control')
    this.table.classList.add('calendar');

    // build the calendar nodes structure
    this.settings.months.forEach((month, index) => {
      let option = document.createElement('option');
      option.value = index;
      option.innerHTML = month;
      this.monthSelector.appendChild(option);
    })

    // append the calendar to DOM
    this.datepickerControl.appendChild(this.monthSelector);
    this.datepickerControl.appendChild(this.yearSelector);
    this.dropdownMenu.appendChild(this.datepickerControl);
    this.dropdownMenu.appendChild(this.table);
    this.wrapper.appendChild(this.dropdownMenu);
    this.el.parentNode.insertBefore(this.wrapper, this.el);
    this.wrapper.appendChild(this.el);

    // start
    this.dropdown = new Dropdown(this.el, this.dropdownMenu);
    this.update();
    this.initEvents();
  }

  initEvents () {
    this.monthSelector.addEventListener('change', (e) => {
      this.setMonth(e.target.value);
      this.update();
    });
    this.yearSelector.addEventListener('change', (e) => {
      this.setYear(e.target.value);
      this.update();
    });
    this.el.addEventListener('change', (e) => {
      this.setDate(e.target.value);
      this.update();
    });
  }
  
  setDay (day) {
    this.currentDate.setDate(day);
  }

  setYear (year) {
    this.currentDate.setYear(year);
  }

  setMonth (month) {
    this.currentDate.setMonth(month);
  }

  setDate (date) {
    this.currentDate = parse(date, this.settings.dateFormat, new Date());
  }

  update () {
    this.el.value = this.getFormatedDate(this.currentDate);
    this.updateTableDate();
  }

  updateTableDate () {
    this.monthSelector.value = getMonth(this.currentDate);
    this.yearSelector.value = getYear(this.currentDate);
    const dayOfWeek = startOfMonth(this.currentDate).getDay();
    const lastDayOfTheCurrentMonth = endOfMonth(this.currentDate).getDate();
    const lastDayOfThePreviousMonth = endOfMonth(addMonths(this.currentDate, -1)).getDate();
    const currentDay = this.currentDate.getDate();

    // clean calender
    this.table.innerHTML = '';

    let header = document.createElement('tr');
    for (let i = 0; i < 7; i++) {
      this._createCell(header, this.settings.days[i], 'th');
      this.table.appendChild(header);
    }

    let day = lastDayOfThePreviousMonth - dayOfWeek + 1;
    let limit = 0;
    let mode = 'is-previous';
    let active = [];
    for (let rowNumber = 0; rowNumber < 6; rowNumber++) {
      limit = rowNumber > 0 ? lastDayOfTheCurrentMonth : lastDayOfThePreviousMonth;
      let row = document.createElement('tr');
      for (let i = 0; i < this.settings.days.length; i++) {
        if (day > limit) {
          day = 1;
          mode = mode === 'is-previous' ? 'is-current' : 'is-following';
        }
        if (mode === 'is-current' && currentDay === day) {
          active = ['is-active']
        } else {
          active = []
        }
        this._createCell(row, day, 'td', [mode].concat(active));
        this.table.appendChild(row);
        day++;
      }
    }
  }

  handleCellClick (e) {
    const cell = event.target;
    const currentMonth = this.currentDate.getMonth();

    if (cell.classList.contains('is-previous')) {
      this.setMonth(currentMonth - 1);
    }
    if (cell.classList.contains('is-following')) {
      this.setMonth(currentMonth + 1);
    }
    this.setDay(cell.innerHTML);
    this.update();
  }

  getFormatedDate (date) {
    return format(date, this.settings.dateFormat);
  }

  _createCell (row, data, type, extraClass = null) {
    let cell = document.createElement(type);
    if (extraClass) {
      cell.classList.add(...extraClass);
    }
    if (type === 'td') {
      cell.addEventListener('click', this.handleCellClick.bind(this));
    }
    cell.innerHTML = data;
    row.appendChild(cell);
  }
}

export default Datepicker;
