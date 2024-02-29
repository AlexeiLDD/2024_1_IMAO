'use strict';

const rootElement = document.getElementById('root');
const headerElement = document.createElement('header');
const mainElement = document.createElement('main');

rootElement.appendChild(headerElement);
rootElement.appendChild(mainElement);

const config = {
    header: {
        buttons: {
            create: {
                href: '/create',
                inner: 'Разместить объявление',
                render: renderCreate
            },
            login: {
                href: '/login',
                inner: 'Войти',
                render: renderLogin
            },
            signup: {
                href: '/signup',
                inner: 'Зарегистрироваться',
                render: renderSignup,
            }
        }
    }
}

function renderHeader(){
    const logo = document.createElement('img');
    logo.src = 'https://grizly.club/uploads/posts/2023-02/1676327498_grizly-club-p-kartinki-klipart-yula-16.jpg';

    const categoriesButton = document.createElement('button');
    categoriesButton.innerHTML = 'Категории';

    const searchForm = document.createElement('form');
    const inputSearch = document.createElement('input');
    inputSearch.type = 'text';
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Найти'

    headerElement.appendChild(logo)
    headerElement.appendChild(categoriesButton)
    headerElement.appendChild(searchForm)
    searchForm.appendChild(inputSearch)
    searchForm.appendChild(submitButton)

    Object
        .entries(config.header.buttons)
        .forEach(([key, {href, inner}], index) => {
            const button = document.createElement('button');
            // button.href = href;
            button.innerHTML= inner;
            button.dataset.section = key;

            headerElement.appendChild(button);

            button.addEventListener('click', (ev) => {
                goToPage(button)
            });

        })
    ;
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

function goToPage(button) {
    mainElement.innerHTML = '';
  
    const element = config.header.buttons[button.dataset.section].render();
  
    mainElement.appendChild(element);
  }

function renderCreate(){
    const element = document.createElement('div');

    element.innerHTML = "страница размещения объявления";

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

    return element
}

renderHeader()
mainElement.appendChild(renderMain())