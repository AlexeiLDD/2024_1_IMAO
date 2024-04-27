import template from './stats.hbs';
import styles from './stats.scss';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import Histogram from '../histogram/histogram.js';

class StatsContainer {
  #element;

  constructor(items) {
    this.items = items;
  }

  render() {
    this.#renderTemplate();
    
      const chart = new Histogram(this.items);
      this.#element.appendChild(chart.render());
  

    return this.#element;
  }

  #renderTemplate() {
    this.#element = stringToHtmlElement(template(this.items));
  }
}

export default StatsContainer;
