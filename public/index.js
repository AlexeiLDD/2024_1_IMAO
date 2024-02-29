'use strict';

const rootElement = document.getElementById('root');
const headerElement = document.createElement('header');
const mainElement = document.createElement('main');

rootElement.appendChild(headerElement);
rootElement.appendChild(mainElement);

const config = {
    header: {
        logo: {
            tagName: 'img',
            name: 'logo',
            src: 'https://grizly.club/uploads/posts/2023-02/1676327498_grizly-club-p-kartinki-klipart-yula-16.jpg',
            render: renderMain,
        },
        categories: {
            tagName: 'button',
            name: 'categories',
            href: '/categories',
            innerHTML: 'Разместить объявление',
            render: renderDefault,
        },
        search: {
            tagName: 'form',
            searchField: {
                tagName: 'input',
                type: 'text',
            },
            searchButton: {
                tagName: 'input',
                type: 'submit',
                value: 'Найти',
            }
        },
        create: {
            tagName: 'button',
            name: 'create',
            href: '/create',
            innerHTML: 'Разместить объявление',
            render: renderDefault,
        },
        login: {
            tagName: 'button',
            name: 'login',
            href: '/login',
            innerHTML: 'Войти',
            render: renderLogin,
        },
        signup: {
            tagName: 'button',
            name: 'signup',
            href: '/signup',
            innerHTML: 'Зарегистрироваться',
            render: renderSignup,
        }
    
    }
}

/**
 * Функция, разворачивающая элементы HTML на страницу из конфига
 * @param {HTMLElement} parent Родительский элеент, куда помещаются элементы
 * @param {object} config Конфиг с описанием элементов HTML
 */
function makeTree(parent, config) {
    for (const child in config) {
        const element = document.createElement(config[child].tagName);

        for (const property in config[child]) {

            if (
                typeof property != 'object' &&
                property != "tagName"
                ){
                element[property] = config[child][property];
                continue
            }

            makeTree(element, config[child]);
        }

        parent.appendChild(element)

        element.addEventListener('click', (ev) => {
            goToPage(element)
        });
    }
}

function renderHeader(){
    makeTree(headerElement, config.header)
}

function ajax(method, url, body = null, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;
  
    xhr.addEventListener('readystatechange', function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
  
      callback(xhr.status, xhr.responseText);
    });
  
    if (body) {
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
      xhr.send(JSON.stringify(body));
      return;
    }
  
    xhr.send(); 
  }

function goToPage(element) {
    mainElement.innerHTML = '';
  
    const render = config.header[element.name]?.render();
  
    if (typeof render != 'undefined') {
        mainElement.appendChild(render);
    }
  }

function renderDefault(){
    const element = document.createElement('div');

    element.innerHTML = "страница пока не добавлена";

    return element;
}

function renderLogin(){
    const element = document.createElement('div');

    element.innerHTML = "страница авторизации";

    return element;
}

function renderSignup(){
    const element = document.createElement('div');

    element.innerHTML = "страница регистрации";

    return element;
}

function renderMain(){
    const element = document.createElement('div');

    element.innerHTML = "страница размещения объявления";

    ajax(
        'GET',
        '/main',
        null,
        (status, responseString) => {
            let Success = status === 200;
    
            if (!Success) {
              alert('Нет авторизации!');
              goToPage(state.menuElements.login);
              return;
            }
    
            const ads = JSON.parse(responseString);
    
            if (ads && Array.isArray(ads)) {
              const div = document.createElement('div');
              element.appendChild(div);
    
              ads.forEach(({inner}) => {
                console.log(inner);
                div.innerHTML += inner;
              });
            }
          }
    )

    return element;
}

renderHeader();
mainElement.appendChild(renderMain());
