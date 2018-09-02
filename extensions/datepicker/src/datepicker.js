import Dropdown from '../../dropdown/src/dropdown';
import {
  endOfMonth,
  startOfMonth,
  getYear,
  getMonth,
  format,
  parse,
  setDate,
  addMonths
} from 'date-fns';

class Datepicker {
  constructor (el, {
    dateFormat = 'YYYY-MM-DD'
  } = {}) {
    this.el = document.querySelector(el);
    this.settings = {
      dateFormat
    };
    this.init();
  }

  init () {
    // init constants;
    this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    this.currentDate = new Date();

    // create datepicker wrapper
    this.wrapper = document.createElement('div');
    this.calendar = document.createElement('div');
    this.calendarControl = document.createElement('div');
    this.table = document.createElement('table');
    this.yearSelector = document.createElement('input');
    this.monthSelector = document.createElement('select');

    this.wrapper.classList.add('dropdown');
    this.calendar.classList.add('calendar');
    this.calendarControl.classList.add('calendar-control')
    this.el.classList.add('datepicker');
    this.table.classList.add('calendar-table');

    // build the calendar nodes structure
    this.months.forEach((month, index) => {
      let option = document.createElement('option');
      option.value = index;
      option.innerHTML = month;
      this.monthSelector.appendChild(option);
    })

    // append the calendar to DOM
    this.calendarControl.appendChild(this.monthSelector);
    this.calendarControl.appendChild(this.yearSelector);
    this.calendar.appendChild(this.calendarControl);
    this.calendar.appendChild(this.table);
    this.wrapper.appendChild(this.calendar);
    this.el.parentNode.insertBefore(this.wrapper, this.el);
    this.wrapper.appendChild(this.el);

    // start
    this.dropdown = new Dropdown(this.el, this.calendar);
    this.setDate(this.currentDate);
    this.updateCalendar();
    this.initEvents();
  }

  initEvents () {
    this.monthSelector.addEventListener('change', () => {
      this.currentDate.setMonth(this.monthSelector.value);
      this.updateTableDate();
    }, false);
    this.yearSelector.addEventListener('change', () => {
      this.currentDate.setYear(this.yearSelector.value);
      this.updateTableDate();
    }, false);
    this.el.addEventListener('change', this.updateCalendar.bind(this), false);
  }

  updateCalendar () {
    this.currentDate = parse(this.el.value, this.settings.dateFormat, new Date());
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
    for (let i = 0; i < this.days.length; i++) {
      this._createCell(header, this.days[i], 'th');
      this.table.appendChild(header);
    }

    let day = lastDayOfThePreviousMonth - dayOfWeek + 1;
    let limit = 0;
    let mode = 'is-previous';
    let active = [];
    for (let rowNumber = 0; rowNumber < 6; rowNumber++) {
      limit = rowNumber > 0 ? lastDayOfTheCurrentMonth : lastDayOfThePreviousMonth;
      let row = document.createElement('tr');
      for (let i = 0; i < this.days.length; i++) {
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

  getCurrentCellDate (cell) {
    let date = setDate(this.currentDate, cell.innerHTML);
    let currentMonth = this.currentDate.getMonth();
    if (cell.classList.contains('is-previous')) date.setMonth(currentMonth - 1);
    if (cell.classList.contains('is-following')) date.setMonth(currentMonth + 1);
    cell.classList.add('is-active');

    return date;
  }

  getFormatedDate (date) {
    return format(date, this.settings.dateFormat);
  }

  setDate (date) {
    this.el.value = this.getFormatedDate(date);
    this.el.dispatchEvent(new Event('change'));
  }

  _createCell (row, data, type, extraClass = [null]) {
    let cell = document.createElement(type);
    if (extraClass) cell.classList.add(...extraClass);
    cell.addEventListener('click', () => this.setDate(this.getCurrentCellDate(cell)));
    cell.innerHTML = data;
    row.appendChild(cell);
  }
}

export default Datepicker;
