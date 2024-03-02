'use strict'

export const CONFIG_LOGIN = {
    loginLabel:{
        tagName: 'h2',
        innerHTML: 'Авторизация',
    },
    email: {
        tagName: 'input',
        type: 'email',
        placeholder: 'Aдресс почты',
        name: 'email',
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
};
