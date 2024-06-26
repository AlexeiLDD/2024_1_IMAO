'use strict';

/**
 * Function parses path params.
 * @param {URL} routerUrl - URL from the router.
 * @param {URL} userUrl - URL recieved from user.
 * @return {object}
 */
export function parsePathParams(routerUrl, userUrl) {
  const params = {};
  const pathParts = routerUrl.pathname.split('/');
  const urlParts = userUrl.pathname.split('/');

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];
    if (part.startsWith(':')) {
      const paramName = part.slice(1);
      const paramValue = urlParts[i];
      params[paramName] = paramValue;
    }
  }

  return params;
}

/**
 * Build URL using params.
 * @param {URL} url
 * @param {Object} params
 * @return {URL}
 */
export function buildURL(url, params) {
  let path = url.pathname;

  for (const paramName in params) {
    // eslint-disable-next-line no-prototype-builtins
    if (params.hasOwnProperty(paramName)) {
      path = path.replace(':' + paramName, params[paramName]);
    }
  }

  const retURL = new URL(path, url.origin);
  retURL.search = url.search;

  return retURL;
}

/**
 * Build URL using path segments.
 * @param {string} serverHost - Host of the server.
 * @param {Object} segments - Path segments.
 * @return {URL} - Builded URL.
 */
export function buildURLBySegments(serverHost, segments) {
  let path = '';
  segments.forEach((segment) => {
    path = path + '/' + segment;
  });

  return new URL(path, serverHost);
}

/**
 * Turns browser location into URL object.
 * @param {string} location - Browser location.
 * @param {string} serverHost - Host of the server.
 * @return {URL} - URL object from location.
 */
export function getURLFromLocation(location, serverHost) {
  const path = location.split(serverHost).join('');

  return new URL(path, serverHost);
}
