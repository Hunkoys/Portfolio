import dom, { SuperDom } from '../../../lib/superdom.js';

class Selector extends SuperDom {
  constructor(...options) {
    super(document.createElement('div'));
    this.options = {};

    this.child(...options);
  }

  child(...options) {
    this.empty();

    for (const option of options) {
      if (!isString(option)) console.error('Selector currently does not support non-string values', option);
      const elem = dom
        .button(option)
        .style(this._optionStyle)
        .onClick(() => {
          // this._selectEvent(option);
          if (this._selectTask) this._selectTask(option);
        });
      this.append(elem);
      this.options[option] = elem;
    }

    return this;
  }

  _selectEvent(option) {
    if (!this.options[option]) return;

    const optionElement = this.options[option];

    if (this._selectedStyle) {
      if (this._selectedOptionElement) this._selectedOptionElement.removeStyle(this._selectedStyle);
      optionElement.style(this._selectedStyle);
    }

    this._selectedOptionElement = optionElement;
    this._selectedOptionText = option;
    // if (this._selectTask) this._selectTask(this._selectedOptionText);
  }

  select(option) {
    this._selectEvent(option);

    return this;
  }

  onSelect(task) {
    this._selectTask = (option) => {
      task(option);
    };

    return this;
  }

  optionStyle(styleObject) {
    this._optionStyle = styleObject;

    for (const option in this.options) {
      this.options[option].style(styleObject);
    }

    return this;
  }

  selectedStyle(styleObject) {
    this._selectedStyle = styleObject;

    return this;
  }

  get selectedElement() {
    return this._selectedOptionElement;
  }

  get selected() {
    return this._selectedOptionText;
  }
}

export default Selector;
