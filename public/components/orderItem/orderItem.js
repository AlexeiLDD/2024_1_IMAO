'use strict';

import { trimString } from '../../modules/trimString.js';

const MAX_TITLE_LENGTH = 40;

/**
 * Render an orderIte template.
 * @param {number} num
 * @param {number} id
 * @param {string} title - The title of the product.
 * @param {string | number} price - The price of the product.
 * @return {Handlebars.TemplateDelegate} - The template of card.
 */
export function renderOrderItem(num, id, title, price) {
  // eslint-disable-next-line no-undef
  const template = Handlebars.templates['orderItem.hbs'];
  title = trimString(title, MAX_TITLE_LENGTH);

  return template({num, id, title, price});
}
