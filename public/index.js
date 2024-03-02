'use strict';

import { Ajax } from "./modules/ajax.js";
import { MakeTree } from "./modules/makeTree.js";
import { CONFIG_HEADER, initHeaderConf} from "./components/header.js";
import { CONFIG_LOGIN } from "./components/login.js";
import { CONFIG_SIGNUP } from "./components/signup.js";

const make = new MakeTree();
const ajax = new Ajax();

const ROUTES = {
    main: '/main',
    login: '/login',
    signup: '/signup',
}

initHeaderConf(
    CONFIG_HEADER,
    {
        renderDefault, 
        renderLogin, 
        renderSignup, 
        renderMain,
    },
);

const rootElement = document.getElementById('root');
const headerElement = document.createElement('header');
const mainElement = document.createElement('main');

rootElement.appendChild(headerElement);
rootElement.appendChild(mainElement);



function goToPage(element, config) {
    const render = config[element.name]?.render?.();
  
    if (typeof render != 'undefined') {
        mainElement.appendChild(render);
    }
  }

function renderHeader(){
    make.makeTree(headerElement, goToPage, CONFIG_HEADER)
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

    make.makeTree(form, goToPage, CONFIG_LOGIN)

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
    
        const inputs = form.getElementsByTagName('input');
        const email = inputs[0].value.trim();
        const password = inputs[1].value;

        ajax.post(
            ROUTES.login,
            {email, password},
            (body) => {
                console.log(body);
                if(body?.session_id) {
                  alert('Успешная авторизация!');
                  mainElement.appendChild(renderMain());
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
    const form = document.createElement('form');

    make.makeTree(form, goToPage, CONFIG_SIGNUP)

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
    
        const inputs = form.getElementsByTagName('input');
        const email = inputs[0].value.trim();
        const password = inputs[1].value;
        const password_repeat = inputs[2].value;

        ajax.post(
            ROUTES.signup,
            {email, password, password_repeat},
            (body) => {
                console.log(body);
                if(body?.session_id) {
                  alert('Успешная регистрация!');
                  mainElement.appendChild(renderMain());
                  return;
                }
                alert('НЕВЕРНЫЙ ЕМЕЙЛ ИЛИ ПАРОЛЬ');
            }
        );
      })
    
      return form;
}

function renderMain(){
    mainElement.innerHTML = '';

    const element = document.createElement('div');

    element.innerHTML = "страница размещения объявления";

    ajax.get(
        ROUTES.main,
        (ads) => {
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
