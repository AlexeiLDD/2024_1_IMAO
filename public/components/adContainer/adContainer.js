'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './adContainer.hbs';
import styles from './adContainer.scss';

/**
 * Render ad page.
 * @param {string} title - Advert title.
 * @param {string} city - Advert city.
 * @param {string} category - Advert category.
 * @param {string} description - Description of an advert.
 * @param {string} created - Created date.
 * @param {*} price
 * @param {*} isAuthor
 * @param {*} editPath
 * @param {*} id
 * @param {*} state
 * @return {Handlebars.TemplateDelegate} - The tmeplate of the advert.
 */
export default function renderAdContainerTemplate(title, city, category, description,
    created, price, isAuthor, editPath, id, state) {
  return stringToHtmlElement(template({title, city, category, description, created, price,
    isAuthor, editPath, id, state}));
}
