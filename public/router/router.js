'use strict';

import {getURLFromLocation} from '../modules/parsePathParams.js';

/**
 * Class represents a router.
 */
class Router {
  /**
   * Set a router's config.
   * @param {object} auth
   * @param {object} routes
   * @param {string} serverHost
   */
  initialize(auth, routes, serverHost) {
    this.auth = auth;
    this.routes = routes;
    this.host = serverHost;
    this.listeners = {};
  }

  /**
   * Init a page render function for route.
   * @param {object} route - The object with _Page postfix.
   * @param {HTMLElement} render - The rendered page.
   */
  init(route, render) {
    this.routes[route].render = render;
  }

  /**
   * Router.
   * @param {URL} href - The route to follow.
   * @param {HTMLElement} parent - The container for a page.
   */
  async #locationResolver(href, parent) {
    await this.emit('checkAuth');

    const routes = this.routes;
    for (const key in routes) {
      if (Object.prototype.hasOwnProperty.call(routes, key)) {
        const route = routes[key];
        if (route.re.test(href.pathname)) {
          document.title = route.name;
          const renderedElement = await route.render();
          parent.appendChild(renderedElement);

          return;
        }
      }
    }
  }

  /**
   * Changing page via url.
   * @param {Event} event
   * @param {HTMLElement} container - The container to render.
   */
  popPage(event, container) {
    let location = window.location.href;

    if (event?.state) {
      location = event.state.page;
    }

    if (location) {
      this.#locationResolver(getURLFromLocation(location, this.host), container);
    }
  }

  /**
   * Push a new page state.
   * @param {object} event
   * @param {string} href
   */
  pushPage(event, href) {
    const url = getURLFromLocation(href, this.host);
    const urlHref = url.href;
    event.preventDefault();
    history.pushState({page: urlHref}, urlHref, urlHref);
    const main = document.getElementsByTagName('main')[0];
    this.#locationResolver(url, main);
  }

  /**
   * Switch page without pushing.
   * @param {URL} url
   */
  go(url) {
    const path = url.href;
    history.replaceState({page: path}, path, path);
    const main = document.getElementsByTagName('main')[0];
    this.#locationResolver(url, main);
  }
  /**
   * On observable function.
   * @param {*} event
   * @param {*} callback
   */
  on(event, callback) {
    if (this.listeners[event] === undefined) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   * Emit observable function.
   * @param {*} event
   * @param {*} data
   */
  async emit(event, data) {
    for (const listener of this.listeners[event]) {
      await listener(data);
    }
  }
}

export default new Router();
