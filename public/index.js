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
            src: '/1676327498_grizly-club-p-kartinki-klipart-yula-16.jpg',
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
    
    },
    login: {
        loginLabel:{
            tagName: 'h2',
            innerHTML: 'Авторизация',
        },
        userName: {
            tagName: 'input',
            type: 'text',
            placeholder: 'Имя пользователя',
            name: 'userName',
        },
        password: {
            tagName: 'input',
            type: 'password',
            placeholder: 'Пароль',
            name: 'password',
        },
        loginButton: {
            tagName: 'input',
            type: 'submit',
            value: 'Войти',
            name: 'loginButton',
        },
    },
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
           
            goToPage(element, config)
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

function goToPage(element, config) {
    const render = config[element.name]?.render?.();
  
    if (typeof render != 'undefined') {
        mainElement.appendChild(render);
    }
  }

function renderDefault(){
    mainElement.innerHTML = '';
    const element = document.createElement('div');

    element.innerHTML = "страница пока не добавлена";

    return element;
}

function renderLogin(){
    mainElement.innerHTML = '';
    const form = document.createElement('form');

    makeTree(form, config.login)

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
    
        const inputs = form.getElementsByTagName('input');
        const username = inputs[0].value.trim();
        const password = inputs[1].value;

        console.log(username);
        console.log(password);
    
        ajax(
          'POST',
          '/login',
            {password, username},
            (status) => {
                if(status === 200) {
                  alert('Успешная авторизация!');
                  return;
                }
                alert('НЕВЕРНЫЙ ЕМЕЙЛ ИЛИ ПАРОЛЬ');
            }
        );
      })
    
      return form;
}

function renderSignup(){
    mainElement.innerHTML = '';
    const element = document.createElement('div');

    element.innerHTML = "страница регистрации";

    return element;
}

function renderMain(){
    mainElement.innerHTML = '';

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
