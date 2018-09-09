import select from '../../_utils/select';

class Switcher {
  constructor (el) {
    this.el = select(el);
    this._init();
  }

  _init() {
    this.body = this.el.querySelector('.switcher-body');
    this.handle = this.el.querySelector('.switcher-handle');
    this.input = this.el.querySelector('.switcher-input');
    this.status = this.input.checked;
    this.currentX = 0;
    this.tempDrag = '';
    this.tempRelease = '';
    this.dragValue = 0;
    this._initEvents();
  }

  _initEvents () {
    this.body.addEventListener('touchstart', (event) => {
      this.currentX = event.touches[0].clientX;
      this.moved = 0;
      document.addEventListener('touchmove', this.tempDrag = (evnt) => this.drag(evnt), false);
      document.addEventListener('touchend', this.tempRelease = (evnt) => this.release(evnt), false);
    }, false);

    this.body.addEventListener('mousedown', (event) => {
      if (event.buttons !== 1) return;
      this.currentX = event.clientX;
      this.moved = 0;
      document.addEventListener('mousemove', this.tempDrag = (evnt) => this.drag(evnt), false);
      document.addEventListener('mouseup', this.tempRelease = (evnt) => this.release(evnt), false);
    }, false);

    this.body.addEventListener('click', (event) => event.preventDefault());
  }

  drag (event) {
    if (event.type === 'mousemove') {
      this.dragValue = (event.clientX - this.currentX);
    }
    if (event.type === 'touchmove') {
      this.dragValue = (event.touches[0].clientX - this.currentX);
    }
    this.handle.classList.add('is-dragging');
    const switcherWidth = this.body.clientWidth;
    const handleWidth = this.handle.clientWidth;
    this.movingRange = switcherWidth - handleWidth - (0.625 * handleWidth);

    this.moved = (this.status ? -1 : 1) * this.dragValue;
    this.dragValue = this.status
      ? Math.max(Math.min(this.dragValue, 0), -this.movingRange)
      : Math.min(Math.max(this.dragValue, 0), this.movingRange)
    this.handle.style.transition = '0s';
    this.handle.style.transform = `translate3d(${this.dragValue}px, 0, 0)`;
  }

  release (event) {
    if (this.moved >= (this.movingRange / 4) || this.moved === 0) {
      this.input.checked = !this.input.checked;
    }

    this.status = this.input.checked;
    this.handle.style.transform = '';
    this.handle.style.transition = '';
    this.handle.classList.remove('is-dragging');

    document.removeEventListener('mousemove', this.tempDrag);
    document.removeEventListener('mouseup', this.tempRelease);
    document.removeEventListener('touchmove', this.tempDrag);
    document.removeEventListener('touchend', this.tempRelease);
  }
}

export default Switcher;
