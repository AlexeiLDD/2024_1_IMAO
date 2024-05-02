'use strict';

import ObservableMixin from '../modules/observableMixin';
import ajax from '../modules/ajax';

/**
 * Model represented a favorites behavior
 */
class Favorites {
  #favoritesItems;

  /**
   *
   */
  constructor() {
    this.listeners = {};
  }

  /**
   *
   * @return {*}
   */
  async getFavorites() {
    // ПЕРЕПИСАТЬ

    let favoritesItems = [];
    await ajax.get(
        ajax.routes.CART.GET_CART_LIST,
        (body) => {
          const items = body['items'];
          if (items !== undefined) {
            favoritesItems = items;
          }
        },
    );

    return favoritesItems;
  }

  /**
   *
   * @param {*} advertId
   * @return {Promise}
   */
  async changeFavorites(advertId) {
    let result = false;
    await ajax.post(
        ajax.routes.FAVORITES.CHANGE_FAVORITES_ITEM_STATUS,
        {advertId},
        (body) => {
          const {isAppended} = body;
          if (isAppended) {
            ajax.auth.favNum++;
          } else {
            ajax.auth.favNum--;
          }
          result = isAppended;
        },
    );
    this.emit('favoritesChange', ajax.auth.favNum);

    return result;
  }
}

Object.assign(Favorites.prototype, ObservableMixin);

export default new Favorites();
