'use strict';

import {renderAdPathTemplate} from '../../components/adPath/adPath.js';
/* eslint-disable-next-line max-len */
import {renderAdContainerTemplate} from '../../components/adContainer/adContainer.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';
import {parsePathParams, buildURL} from '../../modules/parsePathParams.js';
import {getURLFromLocation} from '../../modules/parsePathParams.js';
import {buildURLBySegments} from '../../modules/parsePathParams.js';
import {convertDate} from '../../modules/convertDate.js';

/** Class representing advert page. */
export class Advert {
  #slug;
  #element;

  /**
   * Initialize the advert page.
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
  }

  /**
   * Render the advert Page.
   * @return {Element} - The advert page.
   */
  render() {
    this.#getSlug();
    this.#renderTemplate();

    return this.#element;
  }

  /**
   * Get slug parameters from URL.
   */
  #getSlug() {
    const url = getURLFromLocation(window.location.href, router.host);
    this.#slug = parsePathParams(router.routes.adPage.href, url);
  }

  /**
   * Add event listeners for page.
   */
  #addListeners() {
    this.#addCarouselListeners();
    this.#addPathListener();
  }

  /**
   * Add listeners for images carousel.
   */
  #addCarouselListeners() {
    const carousel = this.#element.querySelector('.carousel');
    // const imagesContainer = this.#element.querySelector('.images');
    const prevBtn = this.#element.querySelector('.prev-btn');
    const nextBtn = this.#element.querySelector('.next-btn');
    // const images = imagesContainer.querySelectorAll('img');

    let currentIndex = 0;
    const elemsOnPage = 3;
    // let elemsOnPage = 0;
    // let elemWidth = images[0].offsetWidth;
    // const containerWidth = carousel.offsetWidth;
    // while (elemWidth < containerWidth) {
    //   elemsOnPage++;
    //   elemWidth += images[elemsOnPage].offsetWidth;
    // }

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1) % elemsOnPage;
      updateCarousel(currentIndex, elemsOnPage);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % elemsOnPage;
      updateCarousel(currentIndex, elemsOnPage);
    });

    const updateCarousel = (currentIndex, elemsOnPage) => {
      const index = (currentIndex + elemsOnPage) % elemsOnPage;
      const newPosition = index !== 2 ? -index * 80 : -index * 50;

      carousel.style.transform = `translateX(${newPosition}%)`;
    };
  }

  /**
   * Event listener to prevent page reload while clicking links in path.
   */
  #addPathListener() {
    const adPath = this.#element.querySelector('.ad-path');
    const cityPath = adPath.querySelector('.city').childNodes[1];
    const categoryPath = adPath.querySelector('.category').childNodes[1];

    cityPath.addEventListener('click', (ev) => {
      const address = cityPath.href;
      router.pushPage(ev, address);
    });

    categoryPath.addEventListener('click', (ev) => {
      const address = categoryPath.href;
      router.pushPage(ev, address);
    });
  }

  /**
   * Render the advert page template.
   */
  #renderTemplate() {
    const content = document.createElement('div');

    this.#element.appendChild(this.header.render());

    content.classList.add('page-content');
    this.#element.appendChild(content);

    const apiRoute = buildURL(ajax.routes.ADVERT.GET_ADVERT, this.#slug);

    ajax.get(
        apiRoute,
        (body) => {
          const items = body['items'];
          const advert = items['advert'];
          const city = items['city'];
          const category = items['category'];

          const adTitle = advert['title'];
          const description = advert['description'];
          const created = convertDate(advert['created']);
          const cityName = city['name'];
          const categoryName = category['name'];

          const categoryPath = buildURLBySegments(router.host,
              [city['translation'], category['translation']]);
          const cityPath = buildURLBySegments(router.host,
              [city['translation']]);

          const adPathElement = document.createElement('div');
          adPathElement.innerHTML =
            renderAdPathTemplate(cityName, categoryName, adTitle,
                cityPath, categoryPath);
          content.appendChild(adPathElement);

          const adContainer = document.createElement('div');
          adContainer.classList.add('ad-container');
          adContainer.innerHTML = renderAdContainerTemplate(adTitle,
              cityName, categoryName, description, created);
          content.appendChild(adContainer);

          this.#addListeners();
        });
  }
}
