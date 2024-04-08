'use strict';

/**
 * Render ad creation form page.
 * @param {String} btn
 * @param {String} title
 * @param {String} price
 * @param {String} description
 * @param {String} city
 * @return {Handlebars.TemplateDelegate} - The tmeplate of the ad creation form.
 */
export function renderAdCreationForm(btn, title, price, description, city) {
  const template = Handlebars.templates['adCreationForm.hbs'];
  return template({title, price, description, city, btn});
}
