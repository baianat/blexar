import { mixColors } from 'color-fns';

import select from '../../_utils/select';
import wrap from '../../_utils/wrap';
import call from '../../_utils/call';
import getClosestValue from '../../_utils/getClosestValue';
import stringToDOM from '../../_utils/stringToDOM';


/**
 * Slider class
 */
export default class Slider {
  constructor (selector, settings) {
    this.el = select(selector);
    this.settings = {
      ...Slider.defaults,
      ...settings
    };
    this._init();
  }

  /**
   * create new rang slider element
   * @param {String|HTMLElement} selector
   * @param {Object}             settings
   */
  static create (selector, settings) {
    Slider(selector, settings);
  }

  _init () {
    this.values = [];
    this.percentages = [];
    this.multiple = this.settings.handles.length > 1;
    this.min = Number(this.el.min) || Number(this.settings.min);
    this.max = Number(this.el.max) || Number(this.settings.max);
    this.step = Number(this.el.step) || Number(this.settings.step);
    if (this.settings.handles.length === 1) {
      this.settings.handles[0] = Number(this.el.value) || Number(this.settings.value);
    }
    this.settings.handles.sort();
    if (this.settings.colorCode) {
      this.el.type = 'text';
    }

    this._initElements();
    if (this.settings.gradient) {
      this._initGradient();
    }
    this._initEvents();
    this.settings.handles.forEach((handle, index) => {
      this.activeHandle = index;
      this.update(handle);
    })
    this.update();
  }

  _initElements () {
    this.handles = [];
    this.labels = [];
    this.wrapper = document.createElement('div');
    this.track = document.createElement('div');

    this.wrapper.classList.add('slider');
    this.wrapper.classList.toggle('is-editable', this.settings.editable);
    this.wrapper.classList.toggle('is-reverse', this.settings.reverse);
    if (this.settings.classes) {
      this.wrapper.classList.add(...this.settings.classes);
    }
    this.track.classList.add('slider-track');
    this.el.classList.add('slider-input');

    if (this.settings.handles.length === 1) {
      this.fill = document.createElement('div');
      this.fill.classList.add('slider-fill');
      this.track.appendChild(this.fill);
    }

    this.settings.handles.forEach((position, index) => {
      this.handles[index] = stringToDOM(`<div class="slider-handle"></div>`);
      if (this.settings.label) {
        this.labels[index] = stringToDOM(`<div class="slider-label"></div>`)
        this.handles[index].appendChild(this.labels[index]);
      }
      this.handles[index].addEventListener('mousedown', this.select.bind(this), false);
      this.handles[index].addEventListener('touchstart', this.select.bind(this), false);
      this.track.appendChild(this.handles[index]);
    });

    wrap(this.el, this.wrapper);
    this.wrapper.appendChild(this.track);
    call(this.settings.created, this);
  }

  _initGradient () {
    if (this.settings.gradient.length > 1) {
      this.track.style.backgroundImage = `linear-gradient(90deg, ${this.settings.gradient})`;
      this.gradient = this.settings.gradient;
      return;
    }
    this.track.style.backgroundImage = '';
    this.track.style.backgroundColor = this.settings.gradient[0];
    this.handles.forEach(handle => {
      handle.style.color = this.settings.gradient[0];
    });
    this.gradient = null;
  }

  _initEvents () {
    window.addEventListener('resize', () => {
      this.updateWidth();
      this.update(undefined, true);
    });
    if (this.settings.trackSlide) {
      this.track.addEventListener('mousedown', this.select.bind(this), false);
      this.track.addEventListener('touchstart', this.select.bind(this), false);
    }
    if (this.settings.editable && !this.settings.colorCode) {
      this.el.addEventListener('change', (evt) => {
        this.update(this.el.value);
      }, false);
    }
  }

  /**
   * fire select events
   */
  select (event) {
    event.preventDefault();
    event.stopPropagation();
    // check if  left mouse is clicked
    if (event.buttons !== 1) return;
    this.track.classList.add('is-dragging');
    this.ticking = false;

    const stepValue = this.getStepValue(event);

    if (this.multiple) {
      let closest = getClosestValue(this.values, stepValue);
      this.activeHandle = this.values.indexOf(closest);
    }
    this.update(stepValue);

    this.tempDrag = this.dragging.bind(this);
    this.tempRelease = this.release.bind(this);
    document.addEventListener('mousemove', this.tempDrag);
    document.addEventListener('touchmove', this.tempDrag);
    document.addEventListener('touchend', this.tempRelease);
    document.addEventListener('mouseup', this.tempRelease);
  }

  /**
   * dragging motion
   */
  dragging (event) {
    event.preventDefault();
    const stepValue = this.getStepValue(event);
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.update(stepValue);
        this.ticking = false;
      });

      this.ticking = true;
    }
  }

  /**
   * release handler
   */
  release () {
    this.track.classList.remove('is-dragging');
    document.removeEventListener('mousemove', this.tempDrag);
    document.removeEventListener('touchmove', this.tempDrag);
    document.removeEventListener('mouseup', this.tempRelease);
    document.removeEventListener('touchend', this.tempRelease);
  }

  getStepValue (event) {
    const eventX = event.type.includes('mouse')
      ? event.clientX : event.type.includes('touch')
        ? event.touches[0].clientX : event;

    const mouseValue = (eventX - this.currentX);
    const stepCount = parseInt((mouseValue / this.stepWidth) + 0.5, 10);
    const stepValue = parseInt((stepCount + this.min) / this.step, 10) * this.step;
    return stepValue;
  }

  updateWidth () {
    const trackRect = this.track.getBoundingClientRect();
    this.currentX = trackRect.left;
    this.width = trackRect.width;
    this.stepWidth = (this.width / (this.max - this.min));
  }

  /**
   * get the filled area percentage
   * @param  {Object} slider
   * @param  {Number} value
   * @return {Number}
   */
  getPositionPercentage (value) {
    return (value - this.min) / (this.max - this.min);
  }

  normalizeValue (value) {
    if (isNaN(Number(value))) {
      return this.value;
    }
    if (this.multiple) {
      const prevValue = this.values[this.activeHandle - 1] || this.min;
      const nextValue = this.values[this.activeHandle + 1] || this.max;
      value = Math.min(Math.max(Number(value), prevValue), nextValue);
    }
    return Math.min(Math.max(Number(value), this.min), this.max);
  }

  newGradient (newGradient) {
    this.settings.gradient = newGradient;
    this._initGradient();
    this.update(undefined, true);
  }

  addHandle (value) {
    const closest = getClosestValue(this.values, value);
    const closestIndex = this.values.indexOf(closest);
    const closestValue = this.values[closestIndex];
    const newIndex = closestValue <= value ? closestIndex + 1 : closestIndex;
    this.values.splice(newIndex, 0, value);
    this.percentages.splice(newIndex, 0, this.getPositionPercentage(value));
    this.handles.splice(newIndex, 0, stringToDOM(`<div class="slider-handle"></div>`));
    if (this.settings.label) {
      this.labels.splice(newIndex, 0, stringToDOM(`<div class="slider-label"></div>`));
      this.handles[newIndex].appendChild(this.labels[newIndex]);
    }
    this.handles[newIndex].addEventListener('mousedown', this.select.bind(this), false);
    this.handles[newIndex].addEventListener('touchstart', this.select.bind(this), false);
    this.track.appendChild(this.handles[newIndex]);
    this.activeHandle = newIndex;
    this.value = null;
    this.update(value);
    return this.handles[newIndex];
  }

  removeHandle (index) {
    this.handles[index].remove();
    this.handles.splice(index, 1);
    this.values.splice(index, 1);
    this.percentages.splice(index, 1);
    if (this.settings.label) {
      this.labels.splice(index, 1);
    }
    this.activeHandle = index === 0 ? index + 1 : index - 1;
  }

  /**
   * get the handle color
   * @param  {Number} positionPercentage
   * @return {Number}                handle hex color code
   */
  getHandleColor (positionPercentage) {
    const colorCount = this.gradient.length - 1;
    const region = positionPercentage;
    for (let i = 1; i <= colorCount; i++) {
      // check the current zone
      if (region >= ((i - 1) / colorCount) && region <= (i / colorCount)) {
        // get the active color percentage
        const colorPercentage = (region - ((i - 1) / colorCount)) / (1 / colorCount);
        // return the mixed color based on the zone boundary colors
        return mixColors(this.gradient[i - 1], this.gradient[i], colorPercentage);
      }
    }
    return 'rgb(0, 0, 0)';
  }

  /**
   * update the slider fill, value and color
   * @param {Number} value
   */
  update (value, mute = false) {
    if (Number(value) === this.value) return;

    if (!this.width) {
      this.updateWidth();
    }
    const normalized = this.normalizeValue(value);
    const positionPercentage = this.getPositionPercentage(normalized);

    if (this.fill) {
      this.fill.style.transform = `translate(${positionPercentage * this.width}px, 0) scale(${1 - positionPercentage}, 1)`;
    }
    this.handles[this.activeHandle].style.transform = `translate(${positionPercentage * this.width}px, 0)`;
    this.value = normalized;
    this.values[this.activeHandle] = normalized;
    this.percentages[this.activeHandle] = positionPercentage;
    this.el.value = this.value;
    if (this.settings.label) {
      this.labels[this.activeHandle].innerHTML = this.value;
    }
    if (this.gradient) {
      const color = this.getHandleColor(positionPercentage);
      this.handles[this.activeHandle].style.color = color;
      if (this.settings.colorCode) {
        this.el.value = color;
        this.labels[this.activeHandle].innerHTML = color;
      }
    }
    if (mute) return;
    this.el.dispatchEvent(new Event('change')); // eslint-disable-line
    this.el.dispatchEvent(new Event('input'));  // eslint-disable-line
    call(this.settings.updated);
  }

  // eslint-disable-next-line
  static defaults = {
    created: {},
    updated: {},
    gradient: null,
    classes: null,
    colorCode: false,
    editable: false,
    reverse: false,
    label: true,
    min: 0,
    max: 10,
    step: 1,
    value: 0,
    handles: [0],
    trackSlide: true
  }
}
